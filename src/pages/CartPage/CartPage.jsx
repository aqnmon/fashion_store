import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { TrashIcon } from "../../components/Icons/Icons";
import "./CartPage.css";

function CartPage() {
  const {
    cartItems,
    totalCount,
    totalPrice,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
  if (!isAuthenticated) {
    navigate("/login", { state: { from: "/checkout" } });   
    return;
  }
  navigate("/checkout");
};

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="1200px">
        <div className="cart-empty">
          <h1>Корзина пуста</h1>
          <p>Добавьте товары из каталога</p>
          <Link to="/catalog" className="cart-empty__link">
            Перейти в каталог
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="1200px">
      <div className="cart-header">
        <h1 className="cart-title">Корзина</h1>
        <p className="cart-subtitle">
          {totalCount} {totalCount === 1 ? "товар" : "товаров"}
        </p>
      </div>

      <div className="cart-layout">
        
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`} className="cart-item__link">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="cart-item__image"
                />
              </Link>

              <div className="cart-item__info">
                <Link to={`/product/${item.id}`} className="cart-item__title">
                  {item.title}
                </Link>
                <p className="cart-item__price">{item.price} tg</p>
              </div>

              <div className="cart-item__controls">
                <button
                  className="cart-item__btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="cart-item__qty">{item.quantity}</span>
                <button
                  className="cart-item__btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <p className="cart-item__total">
                {item.price * item.quantity} tg
              </p>

              <button
                className="cart-item__remove"
                onClick={() => removeFromCart(item.id)}
                aria-label="Удалить"
              >
                <TrashIcon size={18} />
              </button>
            </div>
          ))}

          <button className="cart-clear" onClick={clearCart}>
            Очистить корзину
          </button>
        </div>

     
        <aside className="cart-summary">
          <h2 className="cart-summary__title">Итого</h2>

          <div className="cart-summary__row">
            <span>Товары ({totalCount})</span>
            <span>{totalPrice} tg</span>
          </div>

          <div className="cart-summary__row">
            <span>Доставка</span>
            <span>Бесплатно</span>
          </div>

          <div className="cart-summary__divider" />

          <div className="cart-summary__row cart-summary__row--total">
            <span>К оплате</span>
            <span>{totalPrice} tg</span>
          </div>

          <Button
            text="Оформить заказ"
            variant="primary"
            onClick={handleCheckout}
          />
        </aside>
      </div>
    </Container>
  );
}

export default CartPage;