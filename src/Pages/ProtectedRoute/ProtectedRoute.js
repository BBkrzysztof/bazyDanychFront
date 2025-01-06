import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../Hooks/UseUser';

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);
};

export default ProtectedRoute;
