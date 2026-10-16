import { useParams, Link, useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import Badge from "../../components/Badge/Badge";
import RatingStars from "../../components/RatingStars/RatingStars";
import { initialProducts } from "../../data/products";
import { useCart } from "../../context/CartContext";
import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = initialProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <Container maxWidth="1200px">
        <div className="product-not-found">
          <h1>Товар не найден</h1>
          <p>Товар с ID {id} не существует.</p>
          <Link to="/catalog" className="product-back-link">
            ← Вернуться в каталог
          </Link>
        </div>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <Container maxWidth="1200px">
      <button
        className="product-back"
        onClick={() => navigate(-1)}
      >
        ← Назад
      </button>

      <div className="product">
        <div className="product__image-wrap">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="product__image"
          />
        </div>

        <div className="product__info">
          <Badge label={product.category} colorScheme="green" />
          <h1 className="product__title">{product.title}</h1>
          <p className="product__description">{product.description}</p>

          <RatingStars
            score={product.rating}
            reviewsCount={product.reviewsCount}
          />

          <p className="product__price">{product.price} tg</p>

          <Button
            text="В корзину"
            variant="primary"
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </Container>
  );
}

export default ProductPage;