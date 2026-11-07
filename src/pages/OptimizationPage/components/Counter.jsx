import { memo } from "react";

function CounterBase({ count, onIncrement, onDecrement, tag }) {
  console.log(`${tag} Counter render`);
  return (
    <div className="opt-counter">
      <h3>Счётчик: {count}</h3>
      <div className="opt-counter__btns">
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
      </div>
    </div>
  );
}

export const CounterPlain = CounterBase; // без memo
export default memo(CounterBase); // с memo
