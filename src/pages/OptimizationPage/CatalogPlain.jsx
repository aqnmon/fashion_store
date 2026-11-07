
import { useState } from "react";
import Search from "./components/Search";
import Filters from "./components/Filters";
import { CounterPlain as Counter } from "./components/Counter";
import { ProductStatsPlain as ProductStats } from "./components/ProductStats";
import { ProductListPlain as ProductList } from "./components/ProductList";
import { ProductItemPlain } from "./components/ProductItem";
import { filterAndSort } from "./utils";

const TAG = "🔴 [БЕЗ]";

function CatalogPlain({ products }) {
  console.log(`${TAG} Catalog (родитель) render`);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [sort, setSort] = useState("default");
  const [cartCount, setCartCount] = useState(0);
  const [counter, setCounter] = useState(0);

  // выполняется заново при КАЖДОМ рендере
  const categories = [...new Set(products.map((p) => p.category))];
  const filtered = filterAndSort(products, search, category, sort);

  // новая функция на каждый рендер → новая ссылка в props
  const handleAddToCart = (product) => {
    console.log(`${TAG} 🛒 добавлен: ${product.name}`);
    setCartCount((prev) => prev + 1);
  };

  return (
    <>
      <div className="opt-top-bar">
        <Counter
          tag={TAG}
          count={counter}
          onIncrement={() => setCounter(counter + 1)}
          onDecrement={() => setCounter(Math.max(0, counter - 1))}
        />
        <div className="opt-filters">
          <Search value={search} onChange={(v) => setSearch(v)} />
          <Filters
            categories={categories}
            category={category}
            onCategory={(v) => setCategory(v)}
            sort={sort}
            onSort={(v) => setSort(v)}
          />
        </div>
        <div className="opt-cart">🛒 В корзине: {cartCount}</div>
      </div>

      <ProductStats tag={TAG} products={filtered} />
      <ProductList tag={TAG} products={filtered} Item={ProductItemPlain} onAddToCart={handleAddToCart} />
    </>
  );
}

export default CatalogPlain;
