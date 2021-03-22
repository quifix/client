import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useAxios = () => {
  const [csrfToken, setCsrfToken] = useState<string>(null);
  const [error, setError] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
  });

  const getCSRF = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request.get('/csrf-token');

      setCsrfToken(data.csrfToken);

      request.defaults.headers['X-CSRF-Token'] = data.csrfToken;
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
  }, [request, setLoading]);

  useEffect(() => {
    getCSRF();
  }, [getCSRF]);

  return { csrfToken, error, loading, request };
};
