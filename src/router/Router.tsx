import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SignIn } from '../pages/auth';
import {Layout} from "../common/layout";
import {Home} from "../pages/home";
import {Map} from "../pages/map";
import {Board} from "../pages/board";
import {MyPage} from "../pages/my-page";

export const Router = () => {
  // const _BASE_URL = process.env.PUBLIC_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/auth`} />} />
        <Route path="/auth" element={<SignIn />} />

        <Route element={<Layout/>}>
          <Route path="/home" element={<Home />}/>
          <Route path="/map" element={<Map />}/>
          <Route path="/board" element={<Board />}/>
          <Route path="/mypage" element={<MyPage />}/>
        </Route>
      </Routes>
    </BrowserRouter >
  );
};
