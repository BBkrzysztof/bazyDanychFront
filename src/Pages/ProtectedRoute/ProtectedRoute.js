import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useUser from '../../Hooks/UseUser';

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return <Outlet />;
};

export default ProtectedRoute;
