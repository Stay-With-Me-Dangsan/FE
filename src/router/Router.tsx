import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FindEmail, FindPassword, SignIn, SignUp, OAuthSuccess, OAuthRegister } from '../pages/auth';
import { Layout } from '../common/layout';
import { Home } from '../pages/home';
import { Map, MapDetail } from '../pages/map';
import { Board, BoardDetail } from '../pages/board';
import { MyPage, MyPageNL, MyPageEdit } from '../pages/my-page';

export const Router = () => {
  // const _BASE_URL = process.env.PUBLIC_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/auth`} />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/auth/signUp" element={<SignUp />} />
        <Route path="/auth/findEmail" element={<FindEmail />} />
        <Route path="/auth/findPassword" element={<FindPassword />} />
        <Route path="/oauth/success/:provider" element={<OAuthSuccess />} />
        <Route path="/oauth/register/:provider" element={<OAuthRegister />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/map/detail/:id" element={<MapDetail />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/detail" element={<BoardDetail />} />
          <Route path="/board/detail/:id" element={<BoardDetail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypageNl" element={<MyPageNL />} />
          <Route path="/mypage/edit" element={<MyPageEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
