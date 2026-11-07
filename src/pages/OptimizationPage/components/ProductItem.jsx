import { memo } from "react";

function ProductItemBase({ product, onAddToCart, tag }) {
  console.log(`${tag} ProductItem render: ${product.name}`);
  return (
    <div className="opt-card">
      <div className="opt-card__info">
        <h3>{product.name}</h3>
        <p>{product.category} | ⭐ {product.rating}</p>
        <p className="opt-card__price">{product.price} ₸</p>
      </div>
      <button onClick={() => onAddToCart(product)} className="opt-card__btn">
        Добавить в корзину
      </button>
    </div>
  );
}

export const ProductItemPlain = ProductItemBase; // без memo
export default memo(ProductItemBase); // React.memo (п. 10)
