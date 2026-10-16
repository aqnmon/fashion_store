import { ChevronDownIcon } from "../Icons/Icons";
import "./SortDropdown.css";

function SortDropdown({ sortBy, onChange }) {
  return (
    <div className="sort-dropdown">
      <select
        className="sort-dropdown__select"
        value={sortBy}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="price-asc">Цена: от низкой к высокой</option>
        <option value="price-desc">Цена: от высокой к низкой</option>
        <option value="rating-desc">Рейтинг: по убыванию</option>
      </select>

      <span className="sort-dropdown__icon">
        <ChevronDownIcon size={16} />
      </span>
    </div>
  );
}

export default SortDropdown;