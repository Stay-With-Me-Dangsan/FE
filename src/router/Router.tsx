import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { FindEmail, FindPassword, SignIn, SignUp, OAuthSuccess, OAuthRegister } from '../pages/auth';
import { Layout } from '../common/layout';
import { Home } from '../pages/home';
import { Map, MapDetail } from '../pages/map';
import { Board, BoardDetail } from '../pages/board';
import {
  MyPage,
  MyPageNL,
  MyPageEdit,
  MyPageBoardWrite,
  MyPageBoardComment,
  MypageBoardLike,
  MyPageHouseUpload,
  MyPageHouseLike,
  MypageHouseView,
} from '../pages/my-page';
import { Admin, AdminUserList, AdminBlackList, AdminUserDetail, AdminBlackDetail, AdminCode } from '../pages/admin';

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
          <Route path="/mypageNl" element={<MyPageNL />} />
        </Route>
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/board/write" element={<MyPageBoardWrite />} />
          <Route path="/mypage/board/comment" element={<MyPageBoardComment />} />
          <Route path="/mypage/board/like" element={<MypageBoardLike />} />
          <Route path="/mypage/house/upload" element={<MyPageHouseUpload />} />
          <Route path="/mypage/house/like" element={<MyPageHouseLike />} />
          <Route path="/mypage/house/view" element={<MypageHouseView />} />
          <Route path="/mypage/edit" element={<MyPageEdit />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/user/list" element={<AdminUserList />} />
          <Route path="/admin/black/list" element={<AdminBlackList />} />
          <Route path="/admin/user/detail" element={<AdminUserDetail />} />
          <Route path="/admin/black/detail" element={<AdminBlackDetail />} />
          <Route path="/admin/code" element={<AdminCode />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
