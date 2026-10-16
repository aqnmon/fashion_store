import "./CategoryFilter.css";
function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`category-filter__btn ${
            selectedCategory === cat ? "category-filter__btn--active" : ""
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
