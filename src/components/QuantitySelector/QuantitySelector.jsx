import "./QuantitySelector.css";

function QuantitySelector({ quantity, onChange, min = 1, max = 99 }) {
  const decrement = (e) => {
    e.stopPropagation();
    if (quantity > min) onChange(quantity - 1);
  };

  const increment = (e) => {
    e.stopPropagation();
    if (quantity < max) onChange(quantity + 1);
  };

  return (
    <div className="quantity" onClick={(e) => e.stopPropagation()}>
      <button
        className="quantity__btn"
        onClick={decrement}
        disabled={quantity <= min}
      >
        −
      </button>
      <span className="quantity__value">{quantity}</span>
      <button
        className="quantity__btn"
        onClick={increment}
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;