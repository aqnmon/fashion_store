import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { useCart } from "../../context/CartContext";
import "./CheckoutPage.css";

function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Заказ отправлен:", { form, cartItems, totalPrice });

    clearCart();

    navigate("/", { state: { orderSuccess: true } });
  };

  return (
    <Container maxWidth="1200px">
      <div className="checkout">
        <h1 className="checkout__title">Оформление заказа</h1>

        <form className="checkout__form" onSubmit={handleSubmit}>
          <div className="checkout__row">
            <label className="checkout__label">
              Имя получателя
              <input
                className="checkout__input"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="checkout__label">
              Телефон
              <input
                className="checkout__input"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="checkout__label">
            Адрес доставки
            <input
              className="checkout__input"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </label>

          <label className="checkout__label">
            Комментарий (необязательно)
            <textarea
              className="checkout__input checkout__textarea"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              rows={3}
            />
          </label>

          <div className="checkout__summary">
            <p>Товаров: {cartItems.length}</p>
            <p className="checkout__total">
              Итого: <strong>{totalPrice} tg</strong>
            </p>
          </div>

          <Button text="Оформить заказ" variant="primary" type="submit" />
        </form>
      </div>
    </Container>
  );
}

export default CheckoutPage;