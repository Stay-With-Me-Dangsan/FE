import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FindEmail, FindPassword, SignIn, SignUp } from '../pages/auth';
import { Layout } from '../common/layout';
import { Home } from '../pages/home';
import { Map, MapDetail } from '../pages/map';
import { Board, BoardDetail } from '../pages/board';
import { MyPage } from '../pages/my-page';

export const Router = () => {
  // const _BASE_URL = process.env.PUBLIC_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/auth`} />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/find-email" element={<FindEmail />} />
        <Route path="/auth/find-password" element={<FindPassword />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/map/detail/:id" element={<MapDetail />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/detail" element={<BoardDetail />} />
          <Route path="/board/detail/:id" element={<BoardDetail />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
