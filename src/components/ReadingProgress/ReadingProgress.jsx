import { useState, useEffect } from "react";
import "./ReadingProgress.css";

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) {
        setProgress(0);
        return;
      }

      const percent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, percent)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="reading-progress">
      <div
        className="reading-progress__bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ReadingProgress;