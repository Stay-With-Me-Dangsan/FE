import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthApi from '../../../api-url/auth/auth.api';
import {
  ISignInDto,
  ISignUpDto,
  IEmailCodeDto,
  IPatchUpdateNicknameDto,
  IPatchEmailDto,
  IPatchPwDto,
  IfindEmailDto,
} from '../../../types/dto/auth';
import { useAtom } from 'jotai';
import { jwtStore, userIdStore } from '../../../store/auth';
import authApi from '../../../api-url/auth/auth.api';
import { useEffect, useState } from 'react';
// import Alert from '../../../components/popup'

export default function useAuthMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [, setUserId] = useAtom(userIdStore);
  const [, setJwt] = useAtom(jwtStore);
  const [email, setEmail] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSignInMutation = useMutation({
    mutationFn: (data: ISignInDto) => AuthApi.postSignIn(data),
    onSuccess: (res) => {
      const data = res.data?.data?.result;
      const accessToken = data.accessToken;

      setJwt(data.accessToken);
      setUserId(data.user.userId);

      alert('로그인 성공입니다');
      navigate('/home');
    },
    onError: (err) => {
      console.error(err);
      alert('로그인 실패입니다');
    },
  });

  const onSignUpMutation = useMutation({
    mutationFn: (data: ISignUpDto) => AuthApi.postSignUp(data),
    onSuccess: (res) => {},
    onError: (err) => {
      console.error(err);
    },
  });

  const sendEmailMutation = useMutation({
    mutationFn: (email: string) => AuthApi.postSendEmail(email),
    onSuccess: (res) => {
      alert('인증번호가 이메일로 전송되었습니다.');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: (data: { email: string; code: string }) => AuthApi.verifyCode(data.email, data.code),
    onSuccess: (res) => {
      const isValid = res.data?.data;
      if (isValid) {
        alert('이메일 인증이 완료되었습니다.');
      } else {
        alert('인증 코드가 올바르지 않습니다.');
      }
    },
    onError: (err) => {
      console.error(err);
      alert('인증에 실패했습니다.');
    },
  });

  const onFindPwMutation = useMutation({
    mutationFn: (email: string) => AuthApi.postFindPw(email),
    onSuccess: (res) => {
      alert('임시 비밀번호가 이메일로 전송되었습니다!');
      navigate('/');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onFindEmailMutation = useMutation({
    mutationFn: (data: IfindEmailDto) => authApi.postFindEmail(data),
    onSuccess: (res) => {
      const result = res.data?.data;

      // if (result?.email && result.createdDate) {
      //   setEmail(result.email);
      //   setIsVerified(true);
      // } else {
      //   setErrorMessage('입력한 정보와 일치하는 아이디가 없습니다.');
      // }
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const getMyPageMutation = useMutation({
    mutationFn: (userId: number) => authApi.getMyPage(userId),
    onSuccess: (res) => {
      console.log('마이페이지 데이터:', res);
    },
    onError: (error) => {
      console.error('마이페이지 데이터 불러오기 실패:', error);
    },
  });

  const updateNicknameMutation = useMutation({
    mutationFn: (data: IPatchUpdateNicknameDto) => authApi.patchUpdateNickname(data),
    onSuccess: async () => {
      // await queryClient.invalidateQueries({ queryKey: ['myPage'] });
      alert('닉네임 변경 성공공');
    },
    onError: (error) => {
      alert('닉네임 변경 실패');
      console.error('닉네임 변경 실패:', error);
    },
  });

  const updateEmailMutation = useMutation({
    mutationFn: (data: IPatchEmailDto) => authApi.patchUpdateEmail(data),
    onSuccess: async () => {
      // await queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      alert('마이페이지지 변경 성공공');
    },
    onError: (err) => {
      console.error(err);
      alert('마이페이지지 변경에 실패했습니다.');
    },
  });

  const updatePwMutation = useMutation({
    mutationFn: (data: IPatchPwDto) => authApi.patchUpdatePw(data),
    onSuccess: async () => {
      alert('비밀번호호 변경 성공공');
    },
    onError: (err) => {
      console.error(err);
      alert('비밀번호호 변경에 실패했습니다.');
    },
  });

  // const onLogOutMutation = useMutation({
  //   setJwtToken(null);
  //   setUser(null);
  // });

  return {
    onSignInMutation,
    onSignUpMutation,
    sendEmailMutation,
    verifyCodeMutation,
    getMyPageMutation,
    updateNicknameMutation,
    updateEmailMutation,
    updatePwMutation,
    onFindEmailMutation,
    onFindPwMutation,
  };
}
