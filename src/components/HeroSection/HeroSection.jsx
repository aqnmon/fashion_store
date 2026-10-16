import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { FlameIcon } from "../Icons/Icons";
import "./HeroSection.css";

function HeroSection({
  heading,
  subheading,
  buttonText,
  countdownSeconds = 600,
  onButtonClick,
}) {
  const [timeLeft, setTimeLeft] = useState(countdownSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <section className="hero">
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__heading">{heading}</h1>
        <p className="hero__subheading">{subheading}</p>

        <div className="hero__bottom">
          <div className="hero__countdown">
            {timeLeft > 0 ? (
              <>
                <FlameIcon size={16} />
                <span>Распродажа заканчивается через <strong>{formatTime(timeLeft)}</strong></span>
              </>
            ) : (
              <>😢 Распродажа завершена</>
            )}
          </div>

          <Button
            text={buttonText}
            variant="primary"
            onClick={onButtonClick}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;