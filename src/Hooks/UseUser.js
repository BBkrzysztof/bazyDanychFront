import { useCallback, useMemo } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export const useUser = () => {
  const [user, setUser, { removeItem }] = useLocalStorageState('user');

  const login = useCallback(
    (userData) => {
      setUser(userData);
    },
    [setUser]
  );

  const logout = useCallback(() => {
    removeItem();
  }, [removeItem]);

  const isAuthenticated = useMemo(() => !!user, [user]);

  return { user, isAuthenticated, login, logout };
};

export default useUser;
