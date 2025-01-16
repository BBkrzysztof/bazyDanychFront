import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../../Hooks/UseUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
  const { user, isAuthenticated } = useUser();

  const menuItems = useMemo(() => {
    if (!isAuthenticated) {
      return [
        {
          url: '/',
          label: 'Tickets',
        },
        {
          url: '/login',
          label: 'Login',
        },
        {
          url: '/register',
          label: 'Register',
        },
      ];
    }

    return [
      {
        url: '/',
        label: 'Tickets',
        roles: [],
      },
      {
        url: '/profile',
        label: 'Profile',
        roles: [],
        state: { user },
      },
      {
        url: '/users',
        label: 'Users',
        roles: ['RoleAdmin', 'RoleEmployee'],
      },
      {
        url: '/tags',
        label: 'Tags',
        roles: ['RoleAdmin', 'RoleEmployee'],
      },
      {
        url: '/work-time',
        label: 'Work time',
        roles: ['RoleAdmin', 'RoleEmployee'],
      },
      {
        url: '/logout',
        label: 'Logout',
        roles: [],
      },
    ];
  }, [isAuthenticated, user]);

  const linkItemClassList = 'font-semibold text-gray-800 hover:underline';

  return (
    <nav className="border-b bg-[#f3f4f7] border-gray-500 py-3 px-5 flex justify-between ">
      <Link to={'/'}>
        <FontAwesomeIcon icon={faHouse} />
      </Link>
      <div className="flex gap-4 items-center">
        {menuItems.map((item) => {
          if (!isAuthenticated) {
            return (
              <Link
                className={linkItemClassList}
                to={item.url}
                key={`menu-item-${item.label}`}
              >
                {item.label}
              </Link>
            );
          }

          if (item.roles.length === 0 || item.roles.includes(user?.role)) {
            return (
              <Link
                className={linkItemClassList}
                to={item.url}
                key={`menu-item-${item.label}`}
                {...(item?.state !== undefined && { state: item.state })}
              >
                {item.label}
              </Link>
            );
          }

          return <></>;
        })}
      </div>
    </nav>
  );
};

export default Navbar;
