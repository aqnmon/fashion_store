import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Card from "../../components/Card/Card";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import SearchBar from "../../components/SearchBar/SearchBar";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import Pagination from "../../components/Pagination/Pagination";
import Toast from "../../components/Toast/Toast";
import { initialProducts } from "../../data/products";
import { useFavorites } from "../../context/FavoritesContext";
import "./CatalogPage.css";

const categories = ["Все", "Платье", "Куртка", "Джинсы", "Аксессуары"];
const ITEMS_PER_PAGE = 3;

function sortProducts(list, sortBy) {
  const sorted = [...list];

  if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating-desc") sorted.sort((a, b) => b.rating - a.rating);

  return sorted;
}

function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "Все";
  const sortBy = searchParams.get("sort") || "price-asc";
  const searchQuery = searchParams.get("q") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  const { favorites, toggleFavorite } = useFavorites();
const updateParams = (updates) => {
  const params = Object.fromEntries(searchParams.entries());
  const newParams = { ...params, ...updates };

  Object.keys(newParams).forEach((key) => {
    if (
      newParams[key] === "" ||
      newParams[key] === "Все" ||
      (key === "sort" && newParams[key] === "price-asc") ||
      (key === "page" && String(newParams[key]) === "1")
    ) {
      delete newParams[key];
    }
  });

  setSearchParams(newParams);
};

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setIsLoading(true);

    const fakeFetch = new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        const filtered = initialProducts
          .filter((product) =>
            category === "Все" ? true : product.type === category
          )
          .filter((product) =>
            product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
          );

        const sorted = sortProducts(filtered, sortBy);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const paginated = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

        resolve({ items: paginated, total: sorted.length });
      }, 800);

      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    });

    fakeFetch
      .then(({ items, total }) => {
        setProducts(items);
        setTotalProducts(total);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      });

    return () => controller.abort();
  }, [category, debouncedQuery, sortBy, currentPage]);

  useEffect(() => {
    if (!isToastVisible) return;
    const timer = setTimeout(() => setIsToastVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [isToastVisible]);

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  const handleSearchChange = (value) => {
    updateParams({ q: value, page: 1 });   
  };

  const handleCategoryChange = (cat) => {
    updateParams({ category: cat, page: 1 });
  };

  const handleSortChange = (sort) => {
    updateParams({ sort: sort, page: 1 });
  };

  const handlePageChange = (page) => {
    updateParams({ page: page });
  };

  return (
<Container maxWidth="1200px" className="page-catalog">
          <SectionHeader
        title="Популярное"
        subtitle="Выбор наших клиентов"
        align="center"
      />

      <div className="catalog-controls">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
        />
        <SortDropdown sortBy={sortBy} onChange={handleSortChange} />
      </div>

      {isLoading ? (
        <p className="catalog-loading">Загрузка товаров...</p>
      ) : (
        <div className="grid-3">
          {products.length === 0 ? (
            <p className="catalog-empty">Ничего не найдено.</p>
          ) : (
            products.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                imageUrl={product.imageUrl}
                price={product.price}
                category={product.category}
                rating={product.rating}
                reviewsCount={product.reviewsCount}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={() => {
                  const wasFavorite = favorites.includes(product.id);
                  toggleFavorite(product.id);
                  showToast(
                    wasFavorite
                      ? "Удалено из избранного"
                      : "Добавлено в избранное"
                  );
                }}
               onAddedToCart={(title) => showToast(`Добавлено: ${title}`)}
              />
            ))
          )}
        </div>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <Toast message={toastMessage} isVisible={isToastVisible} />
    </Container>
  );
}

export default CatalogPage;