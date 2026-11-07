function Filters({ categories, category, onCategory, sort, onSort }) {
  return (
    <>
      <select value={category} onChange={(e) => onCategory(e.target.value)} className="opt-select">
        <option value="Все">Все категории</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select value={sort} onChange={(e) => onSort(e.target.value)} className="opt-select">
        <option value="default">Сортировка: по умолчанию</option>
        <option value="price-asc">Цена: по возрастанию</option>
        <option value="price-desc">Цена: по убыванию</option>
        <option value="rating">По рейтингу</option>
      </select>
    </>
  );
}

export default Filters;
