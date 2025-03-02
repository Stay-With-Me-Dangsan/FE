import { useLocation, useNavigate } from 'react-router-dom';
import { NavbarBoard, NavbarHome, NavbarMap, NavbarMyPage } from '../../asset/svg';
import { memo } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    const { id } = event.currentTarget;
    navigate(id);
  };

  return (
    <div className="navbar">
      <NavbarHome color={location.pathname.includes('/home') ? '#9470DC' : '#989898'} onClick={onClickHandler} />
      <NavbarMap color={location.pathname.includes('/map') ? '#9470DC' : '#989898'} onClick={onClickHandler} />
      <NavbarBoard color={location.pathname.includes('/board') ? '#9470DC' : '#989898'} onClick={onClickHandler} />
      <NavbarMyPage color={location.pathname.includes('/mypage') ? '#9470DC' : '#989898'} onClick={onClickHandler} />
    </div>
  );
};

export default memo(Navbar);
