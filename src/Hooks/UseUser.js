import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = useCallback(
    (userData) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/');
    },
    [setUser, navigate]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  }, [setUser, navigate]);

  const isAuthenticated = useMemo(
    () => JSON.parse(localStorage.getItem('user')) != null,
    []
  );

  return { user, isAuthenticated, login, logout };
};

export default useUser;
