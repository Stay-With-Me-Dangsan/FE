import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SignIn } from '../pages/auth';

export const Router = () => {
  // const _BASE_URL = process.env.PUBLIC_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/auth`} />} />
        <Route path="/auth" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};
