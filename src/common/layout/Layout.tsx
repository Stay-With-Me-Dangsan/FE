import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export const Layout = () => {
  return (
    <div className="layout">
      <div className="outlet">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
};
