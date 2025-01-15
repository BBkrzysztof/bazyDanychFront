import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useUser from '../../Hooks/UseUser';

export const ProtectedRoleRoute = ({ roles }) => {
  const navigate = useNavigate();
  const { hasRole } = useUser();

  useEffect(() => {
    if (!hasRole(roles)) {
      navigate('/');
    }
  }, [navigate, hasRole, roles]);

  return <Outlet />;
};

export default ProtectedRoleRoute;
