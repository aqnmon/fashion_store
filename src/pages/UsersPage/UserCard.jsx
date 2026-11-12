import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p className="user-card__username">@{user.username}</p>
      <div className="user-card__info">
        <p>📧 {user.email}</p>
        <p>📞 {user.phone}</p>
        <p>🏢 {user.company.name}</p>
      </div>
      <Link to={`/users/${user.id}`} className="user-card__link">
        Подробнее →
      </Link>
    </div>
  );
}

export default UserCard;