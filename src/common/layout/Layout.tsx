import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="outlet">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
};
