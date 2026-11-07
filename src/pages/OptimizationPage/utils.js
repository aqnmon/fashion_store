// Фильтрация + сортировка (чистая функция, не зависит от React)
export function filterAndSort(products, search, category, sort) {
  let result = products;

  const query = search.trim().toLowerCase();
  if (query) result = result.filter((p) => p.name.toLowerCase().includes(query));
  if (category !== "Все") result = result.filter((p) => p.category === category);

  if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
  if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);

  return result;
}

// Искусственно «тяжёлое» вычисление (п. 19)
export function calculateSomething() {
  let sum = 0;
  for (let i = 0; i < 50_000_000; i++) sum += i;
  return sum;
}

export const average = (items, field) =>
  items.length ? items.reduce((acc, p) => acc + p[field], 0) / items.length : 0;
