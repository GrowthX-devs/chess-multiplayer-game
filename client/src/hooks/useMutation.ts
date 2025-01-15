import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type UseMutationResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  mutate: (config?: AxiosRequestConfig) => Promise<void>;
};

const useMutation = <T>(
  axiosConfig: AxiosRequestConfig
): UseMutationResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (config?: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axios({
        ...axiosConfig,
        ...config,
      });
      setData(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, mutate };
};

export default useMutation;
