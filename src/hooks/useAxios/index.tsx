import { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosInstance } from 'axios';
import { CSRF_data, User } from '../../lib';

export const useAuthAxios = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewer, setViewer] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const authAxios: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    withCredentials: true
  });

  const getAcessToken = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const token: string = await getAccessTokenSilently();

      setAccessToken(token);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
      return;
    }
  }, [getAccessTokenSilently]);

  const getCSRFToken = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      const { data }: { data: CSRF_data } = await authAxios.get(
        '/api/csrf-token'
      );

      setCsrfToken(data.csrfToken);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      return;
    }
  }, [authAxios]);

  const getProfile = useCallback(async () => {
    try {
      if (isAuthenticated && user && accessToken) {
        authAxios.defaults.headers['content-type'] = 'application/json';
        authAxios.defaults.headers['Authorization'] = accessToken
          ? `Bearer ${accessToken}`
          : null;
        const { data }: { data: User } = await authAxios.post(
          '/api/authenticate',
          user
        );
        setViewer(data);
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, accessToken]);

  useEffect(() => {
    if (isAuthenticated) {
      getAcessToken();
      getProfile();

      if (!csrfToken) {
        getCSRFToken();
        authAxios.defaults.headers['X-CSRF-Token'] = csrfToken
          ? csrfToken
          : null;
      }

      if (accessToken && user) {
        authAxios.defaults.headers['content-type'] = 'application/json';
        authAxios.defaults.headers['Authorization'] = accessToken
          ? `Bearer ${accessToken}`
          : null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, getAcessToken, getProfile, isAuthenticated, user]);

  return {
    accessToken,
    authAxios,
    error,
    getAcessToken,
    getCSRFToken,
    loading,
    viewer
  };
};
