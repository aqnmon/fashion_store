import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Container from "../../components/Container/Container";

function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Загружаем данные пользователя
  const { data: user, loading: userLoading, error: userError } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  // Загружаем посты пользователя
  const { data: posts, loading: postsLoading } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${id}/posts`
  );

  if (userLoading) return <Container><p className="users-message">Загрузка профиля...</p></Container>;
  if (userError) return <Container><p className="users-message users-message--error">Ошибка: {userError}</p></Container>;

  return (
    <Container maxWidth="800px">
      <button onClick={() => navigate(-1)} className="users-btn users-btn--back">
        ← Назад
      </button>

      <div className="user-detail">
        <h1>{user.name}</h1>
        <p className="user-detail__username">@{user.username}</p>
        
        <div className="user-detail__info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Телефон:</strong> {user.phone}</p>
          <p><strong>Сайт:</strong> {user.website}</p>
          <p><strong>Компания:</strong> {user.company.name}</p>
        </div>

        <hr />

        <h2>Посты пользователя</h2>
        {postsLoading ? (
          <p>Загрузка постов...</p>
        ) : (
          <ul className="user-posts">
            {posts?.map((post) => (
              <li key={post.id} className="user-post">
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}

export default UserDetailPage;