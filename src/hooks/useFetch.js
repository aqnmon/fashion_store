import { useState, useEffect, useCallback } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0); // Состояние для принудительного перезапроса

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Что-то пошло не так");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, trigger]);

  // Функция для повторного запроса
  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  return { data, loading, error, refetch };
}