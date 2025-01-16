import { useCallback, useEffect, useMemo } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import config from '../Api/ApiConfig';
import { useNavigate } from 'react-router-dom';

export const useUser = () => {
  const [user, setUser, { removeItem }] = useLocalStorageState('user');
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (
        event.key === 'user' &&
        event.oldValue !== null &&
        event.newValue === null
      ) {
        navigate('/');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = useCallback(() => {
    removeItem();
  }, [removeItem]);

  const login = useCallback(
    (userData) => {
      setUser(userData);
      config.defaults.headers.common['Authorization'] =
        `Bearer ${userData.jwt}`;

      config.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response?.status === 401) {
            logout();
          }
          return Promise.reject(error);
        }
      );
    },
    [setUser, logout]
  );

  const isAuthenticated = useMemo(() => !!user, [user]);

  /**
   *
   * @param {string[]}roles
   */
  const hasRole = (roles) => {
    return roles.includes(user.role);
  };

  const result = { user, isAuthenticated, login, logout, hasRole };

  return Object.assign(result, {
    user,
    isAuthenticated,
    login,
    logout,
    hasRole,
  });
};

export default useUser;
