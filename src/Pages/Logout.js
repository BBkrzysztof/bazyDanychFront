import useUser from '../Hooks/UseUser';
import { useEffect } from 'react';

export const Logout = () => {
  const { logout } = useUser();

  useEffect(() => {
    logout();
  }, [logout]);
};

export default Logout;
