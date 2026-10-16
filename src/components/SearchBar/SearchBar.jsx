import { SearchIcon } from "../Icons/Icons";
import "./SearchBar.css";

function SearchBar({ value, onChange, placeholder = "Поиск товаров..." }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon">
        <SearchIcon size={18} />
      </span>
      <input
        type="text"
        className="search-bar__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBar;