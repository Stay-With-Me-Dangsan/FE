import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { FindEmail, FindPassword, SignIn, SignUp, OAuthSuccess, OAuthRegister } from '../pages/auth';
import { Layout } from '../common/layout';
import { Home } from '../pages/home';
import { Maps, HouseDetail } from '../pages/map';
import { Board, BoardDetail, BoardWrite } from '../pages/board';
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
import {
  Admin,
  AdminUserList,
  AdminBlackList,
  AdminUserDetail,
  AdminBlackDetail,
  AdminCode,
  AdminBoardList,
} from '../pages/admin';

export const Router = () => {
  // const _BASE_URL = process.env.PUBLIC_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/home`} />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/auth/signUp" element={<SignUp />} />
        <Route path="/auth/findEmail" element={<FindEmail />} />
        <Route path="/auth/findPassword" element={<FindPassword />} />
        <Route path="/oauth/success/:provider" element={<OAuthSuccess />} />
        <Route path="/oauth/register/:provider" element={<OAuthRegister />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Maps />} />
          <Route path="/house/detail/:id" element={<HouseDetail />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/write" element={<BoardWrite />} />
          <Route path="/board/detail/:boardType/:id" element={<BoardDetail />} />
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
          <Route path="/mypage/house/bookmark" element={<MyPageHouseLike />} />
          <Route path="/mypage/house/view" element={<MypageHouseView />} />
          <Route path="/mypage/edit" element={<MyPageEdit />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/board/list" element={<AdminBoardList />} />
          <Route path="/admin/blind/list" element={<AdminBlackList />} />
          <Route path="/admin/user/list" element={<AdminUserList />} />
          <Route path="/admin/black/list" element={<AdminBlackList />} />
          <Route path="/admin/user/detail/:userId" element={<AdminUserDetail />} />
          <Route path="/admin/black/detail" element={<AdminBlackDetail />} />
          <Route path="/admin/code" element={<AdminCode />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
