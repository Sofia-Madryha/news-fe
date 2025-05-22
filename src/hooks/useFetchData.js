import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useFetchData = (apiRequest, err404Message, ...args) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    apiRequest(...args)
      .then((result) => setData(result))
      .catch((err) => {        
        if (err.status === 404 && err.data.msg !== "Invalid url!") {
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
