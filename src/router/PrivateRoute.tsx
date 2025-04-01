import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { jwtStore } from '../store';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [accessToken] = useAtom(jwtStore);
  const location = useLocation();

  // accessToken 없으면 로그인 페이지로 이동
  if (!accessToken) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
