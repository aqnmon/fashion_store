export const bigProductsData = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Одежда ${i + 1}`,
  category: ["Платья", "Куртки", "Джинсы", "Обувь", "Аксессуары"][i % 5],
  price: Math.floor(Math.random() * 50000) + 2000,
  rating: Number((Math.random() * 2 + 3).toFixed(1)),
}));