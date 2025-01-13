import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export const Layout = ({ children }) => {
  return (
    <div className="bg-[#f3f4f7] min-h-[800px]">
      <Navbar />
      {children ? children : <Outlet />}
    </div>
  );
};
export default Layout;
