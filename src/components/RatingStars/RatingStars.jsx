import "./RatingStars.css";

function RatingStars({
  score,
  reviewsCount,
}) {
  const rounded = Math.round(score);

  return (
    <div className="rating">
      <span className="rating__stars rating__stars--filled">
        {"★".repeat(rounded)}
      </span>

      <span className="rating__stars rating__stars--empty">
        {"★".repeat(5 - rounded)}
      </span>

      <span className="rating__count">
        ({reviewsCount})
      </span>
    </div>
  );
}

export default RatingStars;