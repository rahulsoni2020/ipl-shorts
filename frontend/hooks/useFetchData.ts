// hooks/useFetchData.ts
import { useState, useCallback, useEffect } from 'react';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from '@/libs/axios';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface useFetchDataOptions<T = any> {
  url: string;
  method?: HttpMethod;
  body?: any;
  config?: AxiosRequestConfig;
  autoFetch?: boolean;
  onSuccess?: (res: AxiosResponse<T>) => void;
  onError?: (err: any) => void;
}

const useFetchData = <T = any>({
  url,
  method = 'get',
  body,
  config,
  autoFetch = false,
  onSuccess,
  onError,
}: useFetchDataOptions<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(
    async (overrideBody?: any) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance({
          url,
          method,
          data: overrideBody ?? body,
          ...config,
        });
        setData(response.data);
        onSuccess?.(response);
        return response;
      } catch (err) {
        setError(err);
        onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, method, body, config, onSuccess, onError]
  );

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return { data, loading, error, fetchData };
};

export default useFetchData;
