import { useLocation, useNavigate } from 'react-router-dom';
import { NavbarBoard, NavbarHome, NavbarMap, NavbarMyPage } from '../../asset/svg/navbar';
import { useState } from 'react';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pathname, setPathname] = useState<string>(location.pathname);

  const onClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    const { id } = event.currentTarget;
    navigate(id);
    setPathname(id);
  };

  return (
    <div className="absolute bottom-0 w-full h-[108px] z-50 flex justify-around items-center border-t-[1px] border-black bg-white">
      <NavbarHome color={pathname === 'home' ? '#9470DC' : '#989898'} onClick={onClickHandler} />
      <NavbarMap color={pathname === 'map' ? '#9470DC' : '#989898'} onClick={onClickHandler} />
      <NavbarBoard color={pathname === 'board' ? '#9470DC' : '#989898'} onClick={onClickHandler} />
      <NavbarMyPage color={pathname === 'mypage' ? '#9470DC' : '#989898'} onClick={onClickHandler} />
    </div>
  );
};
