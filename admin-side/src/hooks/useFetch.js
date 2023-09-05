import { useState, useEffect } from "react";

const baseUrl = "http://localhost:3000";

export default function useFetch(path) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(baseUrl + path, {
        method: "GET",
      });
      const parsedData = await response.json();
      setData(parsedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
  };
}
