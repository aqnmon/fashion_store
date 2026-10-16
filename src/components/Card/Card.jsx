import { Link } from "react-router-dom";
import Badge from "../Badge/Badge";
import RatingStars from "../RatingStars/RatingStars";
import Button from "../Button/Button";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { HeartIcon } from "../Icons/Icons";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import "./Card.css";

function Card({
  id,
  title,
  description,
  imageUrl,
  price,
  category,
  rating,
  reviewsCount,
  isFavorite,
  onToggleFavorite,
  onAddedToCart,
}) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id, title, price, imageUrl }, quantity);
    if (onAddedToCart) onAddedToCart(title);
    setQuantity(1);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div className="card">
      <div className="card__image-wrap">
        <Link to={`/product/${id}`} className="card__image-link">
          <img src={imageUrl} alt={title} className="card__image" />
        </Link>

        <button
          className={`card__favorite ${isFavorite ? "card__favorite--active" : ""}`}
          onClick={handleFavoriteClick}
          aria-label="В избранное"
        >
          <HeartIcon size={18} filled={isFavorite} />
        </button>
      </div>

      <div className="card__body">
        <Badge label={category} colorScheme="green" />

        <Link to={`/product/${id}`} className="card__title-link">
          <h3 className="card__title">{title}</h3>
        </Link>

        <p className="card__description">{description}</p>
        <RatingStars score={rating} reviewsCount={reviewsCount} />

        <div className="card__footer">
          <span className="card__price">{price} tg</span>

          <div className="card__actions">
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
            <Button
              text="В корзину"
              variant="primary"
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;