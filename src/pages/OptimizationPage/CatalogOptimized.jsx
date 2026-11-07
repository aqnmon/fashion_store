
import { useState, useMemo, useCallback } from "react";
import Search from "./components/Search";
import Filters from "./components/Filters";
import Counter from "./components/Counter";
import ProductStats from "./components/ProductStats";
import ProductList from "./components/ProductList";
import ProductItem from "./components/ProductItem";
import { filterAndSort } from "./utils";

const TAG = "🟢 [С]";

function CatalogOptimized({ products }) {
  console.log(`${TAG} Catalog (родитель) render`);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [sort, setSort] = useState("default");
  const [cartCount, setCartCount] = useState(0);
  const [counter, setCounter] = useState(0);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);

  // пересчитывается только при смене поиска / категории / сортировки
  const filtered = useMemo(() => {
    console.log(`${TAG} ♻️ пересчёт filtered (useMemo)`);
    return filterAndSort(products, search, category, sort);
  }, [products, search, category, sort]);

  //ссылка стабильна (setState с функцией не требует зависимостей)
  const handleAddToCart = useCallback((product) => {
    console.log(`${TAG} 🛒 добавлен: ${product.name}`);
    setCartCount((prev) => prev + 1);
  }, []);

  const handleIncrement = useCallback(() => setCounter((c) => c + 1), []);
  const handleDecrement = useCallback(() => setCounter((c) => Math.max(0, c - 1)), []);

  return (
    <>
      <div className="opt-top-bar">
        <Counter tag={TAG} count={counter} onIncrement={handleIncrement} onDecrement={handleDecrement} />
        <div className="opt-filters">
          <Search value={search} onChange={setSearch} />
          <Filters
            categories={categories}
            category={category}
            onCategory={setCategory}
            sort={sort}
            onSort={setSort}
          />
        </div>
        <div className="opt-cart">🛒 В корзине: {cartCount}</div>
      </div>

      <ProductStats tag={TAG} products={filtered} />
      <ProductList tag={TAG} products={filtered} Item={ProductItem} onAddToCart={handleAddToCart} />
    </>
  );
}

export default CatalogOptimized;
