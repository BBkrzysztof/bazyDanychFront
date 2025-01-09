import useUser from '../Hooks/UseUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
  }, [logout]);
};

export default Logout;
