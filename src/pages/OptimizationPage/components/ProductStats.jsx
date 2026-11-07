import { useMemo } from "react";
import { average, calculateSomething } from "../utils";

function View({ count, avgPrice, avgRating, load }) {
  return (
    <div className="opt-stats">
      <h3>Аналитика каталога:</h3>
      <p>Найдено товаров: {count}</p>
      <p>Средняя цена: {Math.round(avgPrice)} ₸</p>
      <p>Средний рейтинг: {avgRating.toFixed(1)}</p>
      <small className="opt-muted">контрольное значение: {load}</small>
    </div>
  );
}

export function ProductStatsPlain({ products, tag }) {
  console.log(`${tag} ProductStats render`);
  console.log(`${tag} 🔥 тяжёлое вычисление + статистика`);
  const load = calculateSomething();
  return (
    <View
      count={products.length}
      avgPrice={average(products, "price")}
      avgRating={average(products, "rating")}
      load={load}
    />
  );
}

export default function ProductStats({ products, tag }) {
  console.log(`${tag} ProductStats render`);

  const load = useMemo(() => {
    console.log(`${tag} 🔥 тяжёлое вычисление (useMemo)`);
    return calculateSomething();
  }, [products, tag]);

  const avgPrice = useMemo(() => {
    console.log(`${tag} 💰 пересчёт средней цены (useMemo)`);
    return average(products, "price");
  }, [products, tag]);

  const avgRating = useMemo(() => {
    console.log(`${tag} ⭐ пересчёт среднего рейтинга (useMemo)`);
    return average(products, "rating");
  }, [products, tag]);

  return <View count={products.length} avgPrice={avgPrice} avgRating={avgRating} load={load} />;
}
