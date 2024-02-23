import { useEffect, useState } from "react";
import { API } from "../constants";

const useApi = <T,>(route: string) => {
  const url = `${API}${route}`;
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const getData = async () => {
    const api_call = await fetch(url);
    const data = (await api_call.json()) as T;
    setData(data);
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) {
      getData();
    }
  }, [loaded]);

  return data;
};

export default useApi;
