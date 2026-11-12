import { useState, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useDebounce } from "../../hooks/useDebounce";
import UserCard from "./UserCard";
import Container from "../../components/Container/Container";
import "./UsersPage.css";

function UsersPage() {
  // 1. Загружаем данные через кастомный хук
  const { data: users, loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  // 2. Состояния для поиска и фильтра
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("Все");

  // 3. Дебаунс для поиска (500 мс)
  const debouncedSearch = useDebounce(search, 500);

  // 4. Фильтрация (оптимизировано useMemo из Лабы №9)
  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCompany = companyFilter === "Все" || user.company.name === companyFilter;
      return matchesSearch && matchesCompany;
    });
  }, [users, debouncedSearch, companyFilter]);

  // Список уникальных компаний для select
  const companies = useMemo(() => {
    if (!users) return [];
    const unique = new Set(users.map((u) => u.company.name));
    return ["Все", ...Array.from(unique)];
  }, [users]);

  // --- РЕНДЕР СОСТОЯНИЙ ---
  if (loading) {
    return (
      <Container maxWidth="1200px">
        <p className="users-message">Загрузка клиентов...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="1200px">
        <div className="users-message users-message--error">
          <p>Ошибка: {error}</p>
          <button onClick={refetch} className="users-btn">Повторить запрос</button>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="1200px">
      <div className="users-page">
        <div className="users-header">
          <h1>Каталог клиентов</h1>
          <p>Всего найдено: {filteredUsers.length}</p>
        </div>

        {/* Панель фильтров */}
        <div className="users-controls">
          <div className="users-search-wrap">
            <input
              type="text"
              placeholder="Поиск по имени..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="users-input"
            />
            {search && (
              <button className="users-clear" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>

          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="users-select"
          >
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>

          <button onClick={refetch} className="users-btn">
            Обновить данные
          </button>
        </div>

        {/* Список пользователей или Empty State */}
        {filteredUsers.length === 0 ? (
          <p className="users-message">Пользователи не найдены.</p>
        ) : (
          <div className="users-grid">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default UsersPage;