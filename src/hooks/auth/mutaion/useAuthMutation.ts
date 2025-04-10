import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthApi from '../../../api-url/auth/auth.api';
import {
  ISignInDto,
  ISignUpDto,
  IOauthRegDto,
  IEmailCodeDto,
  IPatchUpdateNicknameDto,
  IPatchEmailDto,
  IPatchPwDto,
  IfindEmailDto,
} from '../../../types/dto/auth';
import { useAtom } from 'jotai';
import { jwtStore } from '../../../store';
import authApi from '../../../api-url/auth/auth.api';

export default function useAuthMutation() {
  const navigate = useNavigate();

  // const [, setUserId] = useAtom(userIdStore);
  const [, setJwt] = useAtom(jwtStore);

  const onSignInMutation = useMutation({
    mutationFn: (data: ISignInDto) => AuthApi.postSignIn(data),
    onSuccess: (res) => {
      const data = res.data?.data.result.user;

      setJwt(data.accessToken);
      navigate('/home');
    },
    onError: (err) => {
      console.error(err);
      alert('로그인 실패입니다');
    },
  });

  const onSignUpMutation = useMutation({
    mutationFn: (data: ISignUpDto) => AuthApi.postSignUp(data),
  });

  const OauthRegMutation = useMutation({
    mutationFn: (data: IOauthRegDto) => AuthApi.PatchOauthReg(data),
  });
  const sendEmailMutation = useMutation({
    mutationFn: (email: string) => AuthApi.postSendEmail(email),
  });

  const verifyCodeMutation = useMutation({
    mutationFn: (data: { email: string; code: string }) => AuthApi.verifyCode(data.email, data.code),
  });

  const onFindPwMutation = useMutation({
    mutationFn: (email: string) => AuthApi.postFindPw(email),
  });

  const onFindEmailMutation = useMutation({
    mutationFn: (data: IfindEmailDto) => authApi.postFindEmail(data),
  });

  const getMyPageMutation = useMutation({
    mutationFn: (userId: number) => authApi.getMyPage(userId),
  });

  const updateNicknameMutation = useMutation({
    mutationFn: (data: IPatchUpdateNicknameDto) => authApi.patchUpdateNickname(data),
    onSuccess: async () => {
      // await queryClient.invalidateQueries({ queryKey: ['myPage'] });
    },
  });

  const updateEmailMutation = useMutation({
    mutationFn: (data: IPatchEmailDto) => authApi.patchUpdateEmail(data),
  });

  const updatePwMutation = useMutation({
    mutationFn: (data: IPatchPwDto) => authApi.patchUpdatePw(data),
  });

  const logOutMutation = useMutation({
    mutationFn: () => AuthApi.postLogOut(),
  });

  return {
    onSignInMutation,
    onSignUpMutation,
    OauthRegMutation,
    sendEmailMutation,
    verifyCodeMutation,
    getMyPageMutation,
    updateNicknameMutation,
    updateEmailMutation,
    updatePwMutation,
    onFindEmailMutation,
    onFindPwMutation,
    logOutMutation,
  };
}
