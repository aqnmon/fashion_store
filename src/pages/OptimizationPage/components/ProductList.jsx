import { memo } from "react";

function ProductListBase({ products, Item, onAddToCart, tag }) {
  console.log(`${tag} ProductList render (${products.length} шт.)`);

  if (products.length === 0) {
    return <p className="opt-empty">По вашему запросу ничего не найдено</p>;
  }

  return (
    <div className="opt-grid">
      {products.map((product) => (
        <Item key={product.id} product={product} onAddToCart={onAddToCart} tag={tag} />
      ))}
    </div>
  );
}

export const ProductListPlain = ProductListBase;
export default memo(ProductListBase);
