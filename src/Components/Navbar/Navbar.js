import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../../Hooks/UseUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
  const { user, isAuthenticated } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        url: '/logs',
        label: 'Logs',
        roles: ['RoleAdmin'],
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
    <>
      <nav className="border-b bg-[#f3f4f7] border-gray-500 py-3 px-5 flex justify-between items-center">
        <Link to={'/'}>
          <FontAwesomeIcon icon={faHouse} />
        </Link>

        <button
          className="md:hidden text-gray-800 text-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>

        <div className="hidden md:flex gap-4 items-center">
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

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#f3f4f7] z-50 flex flex-col items-center justify-center"
          onClick={() => setIsMobileMenuOpen(false)} // Close the menu when clicking outside
        >
          <button
            className="absolute top-4 right-4 text-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {menuItems.map((item) => {
            if (!isAuthenticated) {
              return (
                <Link
                  className="text-xl font-semibold text-gray-800 py-4"
                  to={item.url}
                  key={`mobile-menu-item-${item.label}`}
                  onClick={() => setIsMobileMenuOpen(false)} // Close the menu when clicking a link
                >
                  {item.label}
                </Link>
              );
            }

            if (item.roles.length === 0 || item.roles.includes(user?.role)) {
              return (
                <Link
                  className="text-xl font-semibold text-gray-800 py-4"
                  to={item.url}
                  key={`mobile-menu-item-${item.label}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  {...(item?.state !== undefined && { state: item.state })}
                >
                  {item.label}
                </Link>
              );
            }

            return <></>;
          })}
        </div>
      )}
    </>
  );
};

export default Navbar;
