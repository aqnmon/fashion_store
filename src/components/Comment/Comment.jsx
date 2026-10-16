import "./Comment.css";

function Comment({
  authorName,
  authorRole,
  avatar,
  text,
  date,
}) {
  return (
    <div className="comment-card">
      <div className="comment-card__header">
        <img
          src={avatar}
          alt={authorName}
          className="comment-card__avatar"
        />

        <div className="comment-card__author-info">
          <p className="comment-card__author">
            {authorName}
          </p>

          <p className="comment-card__role">
            {authorRole}
          </p>
        </div>

        <span className="comment-card__date">
          {date}
        </span>
      </div>

      <p className="comment-card__text">
        {text}
      </p>
    </div>
  );
}

export default Comment;