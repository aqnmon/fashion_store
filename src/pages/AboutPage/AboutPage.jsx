import Container from "../../components/Container/Container";
import "./AboutPage.css";

function AboutPage() {
  return (
    <Container maxWidth="1200px">
      <div className="about">
        <h1 className="about__title">О нас</h1>
        <p className="about__lead">
          AB Fashion Store — магазин современной одежды для тех,
          кто ценит качество, стиль и удобство. Мы собрали коллекции
          на каждый сезон: от лёгких летних платьев до тёплых
          демисезонных курток.
        </p>

        <div className="about__section">
          <h2 className="about__subtitle">Наши принципы</h2>
          <ul className="about__list">
            <li>Только качественные материалы и проверенные бренды</li>
            <li>Честные цены без скрытых наценок</li>
            <li>Быстрая доставка по всему Казахстану</li>
            <li>Возможность вернуть товар в течение 14 дней</li>
            <li>Помощь стилиста при выборе образа</li>
          </ul>
        </div>

        <div className="about__section">
          <h2 className="about__subtitle">Что вас ждёт</h2>
          <ul className="about__list">
            <li>Каталог одежды с удобным поиском и фильтрами</li>
            <li>Возможность добавлять товары в избранное</li>
            <li>Корзина с сохранением вашего выбора</li>
            <li>Быстрое оформление заказа в один клик</li>
            <li>Тёмная и светлая тема для комфортного просмотра</li>
          </ul>
        </div>

        <div className="about__section">
          <h2 className="about__subtitle">Контакты</h2>
          <ul className="about__list">
            <li>📞 +7 (999) 123-45-67</li>
            <li>✉️ info@fashion.ru</li>
            <li>📍 Алматы, ул. Абая, 100</li>
            <li>🕒 Ежедневно с 10:00 до 22:00</li>
          </ul>
        </div>

        <div className="about__section">
          <h2 className="about__subtitle">Мы в соцсетях</h2>
          <div className="about__tags">
            <span className="about__tag">Instagram</span>
            <span className="about__tag">Facebook</span>
            <span className="about__tag">Telegram</span>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AboutPage;