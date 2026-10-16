
import "./UserProfile.css";

function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="user-profile__avatar"
      />
      <div className="user-profile__info">
        <p className="user-profile__name">{user.name}</p>
        <p className="user-profile__role">{user.role}</p>
      </div>
    </div>
  );
}

export default UserProfile;