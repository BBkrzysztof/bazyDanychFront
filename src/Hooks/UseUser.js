import { useCallback, useEffect, useMemo, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export const useUser = () => {
  const [user, setUser, { removeItem }] = useLocalStorageState('user');

  const login = useCallback(
    (userData) => {
      setUser(userData);
    },
    [user]
  );

  const logout = useCallback(() => {
    removeItem();
  }, []);

  const isAuthenticated = useMemo(() => !!user, [user]);

  return { user, isAuthenticated, login, logout };
};

export default useUser;
