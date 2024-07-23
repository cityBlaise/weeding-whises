import { useState, useEffect } from "react";

 

const useFetch = <T,>(url: string, options?: RequestInit): [T | null, string | null, boolean] => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setError(null)
    setLoading(!false);
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${await response.json()}`);
        }
        const result: T = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return  [data, error, loading];
};

export default useFetch;
