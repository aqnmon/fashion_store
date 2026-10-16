import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import { initialProducts } from "../../data/products";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";
import "./FavoritesPage.css";

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const favoriteProducts = initialProducts.filter((product) =>
    favorites.includes(product.id)
  );

  if (favoriteProducts.length === 0) {
    return (
      <Container maxWidth="1200px">
        <div className="favorites-empty">
          <h1>В избранном пусто</h1>
          <p>Добавляйте товары, нажимая на сердечко</p>
          <Link to="/catalog" className="favorites-empty__link">
            Перейти в каталог
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="1200px">
      <div className="favorites-header">
        <h1 className="favorites-title">Избранное</h1>
        <p className="favorites-subtitle">
          {favoriteProducts.length}{" "}
          {favoriteProducts.length === 1 ? "товар" : "товаров"}
        </p>
      </div>

      <div className="grid-3">
        {favoriteProducts.map((product) => (
  <Card
    key={product.id}
    id={product.id}
    title={product.title}
    description={product.description}
    imageUrl={product.imageUrl}
    price={product.price}
    category={product.category}
    rating={product.rating}
    reviewsCount={product.reviewsCount}
    isFavorite={true}
    onToggleFavorite={() => toggleFavorite(product.id)}
    onAddedToCart={() => addToCart(product)}
  />
))}
      </div>
    </Container>
  );
}

export default FavoritesPage;