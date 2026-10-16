import "./StatCard.css";

function StatCard({
  title,
  value,
  change,
  isPositive,
}) {
  return (
    <div className="stat-card">
      <p className="stat-card__title">
        {title}
      </p>

      <p className="stat-card__value">
        {value}
      </p>

      <p
        className={`stat-card__change ${
          isPositive
            ? "stat-card__change--up"
            : "stat-card__change--down"
        }`}
      >
        {isPositive ? "▲" : "▼"} {change}%
      </p>
    </div>
  );
}

export default StatCard;