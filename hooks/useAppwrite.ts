import { VideoType } from "@/types";
import { useEffect, useState } from "react";


const useAppWrite = (fn: () => Promise<VideoType[]>) => {
  const [data, setData] = useState<VideoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    const response = await fn();

    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppWrite;