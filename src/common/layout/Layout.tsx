import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className="bg-gradient-to-r from-white via-[#F5F5F5] to-[#F1F1F1] p-[2px] rounded-xl bg-white">
      <div className="layout rounded-xl shadow-md">
        <Header />
        <div className="outlet">
          <Outlet />
        </div>
        <Navbar />
      </div>
    </div>
  );
};
