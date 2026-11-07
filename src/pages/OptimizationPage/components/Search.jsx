function Search({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Поиск по названию..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="opt-input"
    />
  );
}

export default Search;
