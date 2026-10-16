import Container from "../../components/Container/Container";
import HeroSection from "../../components/HeroSection/HeroSection";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import StatCard from "../../components/StatCard/StatCard";
import Comment from "../../components/Comment/Comment";
import { useNavigate } from "react-router-dom";

const reviews = [
  {
    id: 1,
    authorName: "Мариям",
    authorRole: "Клиент",
    avatar: "/profile.jpeg",
    text: "Отличное качество, быстрая доставка!",
    date: "12.05.2025",
  },
  {
    id: 2,
    authorName: "Берхан",
    authorRole: "Клиент",
    avatar: "/profile.jpeg",
    text: "Размер соответствует заявленному, а ткань приятная на ощупь.",
    date: "10.05.2025",
  },
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="1200px">
      <HeroSection
        heading="Новая коллекция сезона весна-лето 2025"
        subheading="Скидки до 50% на всё"
        buttonText="Посмотреть каталог"
        countdownSeconds={300}
        onButtonClick={() => navigate("/catalog")}
      />

      <SectionHeader
        title="Статистика магазина"
        subtitle="Показатели работы нашего магазина"
        align="left"
      />

      <div className="grid-3">
        <StatCard
          title="Ежемесячные продажи"
          value="1 245"
          change="12"
          isPositive={true}
        />
        <StatCard
          title="Новые клиенты"
          value="320"
          change="8"
          isPositive={true}
        />
        <StatCard
          title="Возврат"
          value="24"
          change="3"
          isPositive={false}
        />
      </div>

      <SectionHeader
        title="Отзывы клиентов"
        subtitle="Что говорят наши клиенты"
        align="left"
      />

      <div className="grid-2">
        {reviews.map((review) => (
          <Comment key={review.id} {...review} />
        ))}
      </div>
    </Container>
  );
}

export default HomePage;