import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import AuthApi from '../../../api-url/auth/auth.api';
<<<<<<< Updated upstream
import { SignInRequestDto } from '../../../types/interface/dto';
=======
import React, { useState } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { accessTokenAtom, isLoggedInAtom, userAtom } from '../../../store/auth/auth';
// import Cookies from 'js-cookie';
import { ISignInReq, ISignUpReq, IEmailCodeReq } from '../../../types/interface/auth/req';
>>>>>>> Stashed changes

export default function useAuthMutation() {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetAtom(isLoggedInAtom); // 로그인 상태 설정
  const setUser = useSetAtom(userAtom); // 사용자 정보 상태 설정
  const setAccessToken = useSetAtom(accessTokenAtom); // 토큰 상태 설정

  const onSignInMutation = useMutation({
    mutationFn: (dto: SignInRequestDto) => AuthApi.postSignIn(dto),
    onSuccess: (res) => {
      const {} = res.data.data;
      console.log('응답 데이터:', res);
      setIsLoggedIn(true); // 로그인 상태 true로 설정
      // setUser({ email, password }); // 사용자 정보 업데이트
      // setAccessToken(accessToken); // 액세스 토큰 저장
      // ✅ 토큰을 localStorage에 저장하여 새로고침해도 유지
      // localStorage.setItem('accessToken', accessToken);
      //   console.log('저장된 accessToken:', accessToken);
      // 🔹 Refresh Token을 HttpOnly 쿠키에 저장
      // Cookies.set('refreshToken', refreshToken, { path: '/', secure: true, sameSite: 'Strict' });
      alert('로그인 완료되었습니다!');
      navigate('/home');
    },
<<<<<<< Updated upstream
    onError: (err) => {},
=======
    onError: (error: any) => {
      alert(error.message || '로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const onSignUpMutation = useMutation({
    mutationFn: (dto: ISignUpReq) => AuthApi.postSignUp(dto),
    onSuccess: () => {},
    onError: (err) => {
      console.error(err);
    },
  });

  const sendEmailMutation = useMutation({
    mutationFn: (email: string) => AuthApi.sendEmailMutation(email),
    onSuccess: (res) => {
      alert('인증번호가 이메일로 전송되었습니다.');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // const verifyCodeMutation = useMutation({
  //   mutationFn: (dto: IEmailCodeReq) => AuthApi.verifyCodeMutation(dto),
  //   onSuccess: () => {
  //     alert('이메일 인증이 완료되었습니다.');
  //   },
  //   onError: (err) => {
  //     console.error(err);
  //     alert('인증에 실패했습니다.');
  //   },
  // });

  const onFindPw = useMutation({
    mutationFn: (email: string) => AuthApi.postFindPw(email),
    onSuccess: (res) => {
      alert('임시 비밀번호가 이메일로 전송되었습니다!');
      navigate('/');
    },
    onError: (err) => {
      console.error(err);
    },
>>>>>>> Stashed changes
  });

  return {
    onSignInMutation,
<<<<<<< Updated upstream
=======
    onSignUpMutation,
    sendEmailMutation,
>>>>>>> Stashed changes
  };
}
