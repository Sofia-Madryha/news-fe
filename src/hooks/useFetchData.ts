import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useFetchData = <T extends any[]>(
  apiRequest: (...args: T[]) => Promise<T>,
  err404Message?: string,
  ...args: T[]
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    setIsLoading(true);
    apiRequest(...args)
      .then((result) => setData(result))
      .catch((err) => {
        if (
          err.status === 404 &&
          err.data.msg !== "Invalid url!" &&
          err404Message
        ) {
          setError(err404Message);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [...args]);

  return { data, isLoading, error };
};
