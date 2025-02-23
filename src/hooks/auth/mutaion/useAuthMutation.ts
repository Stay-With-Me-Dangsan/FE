import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import AuthApi from '../../../api-url/auth/auth.api';
import { ISignInReq } from '../../../types/interface/auth/req';

export default function useAuthMutation() {
  const navigate = useNavigate();

  const onSignInMutation = useMutation({
    mutationFn: (dto: ISignInReq) => AuthApi.postSignIn(dto),
    onSuccess: (res) => {
      navigate('/home');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onSignUpMutation = useMutation({
    mutationFn: () => AuthApi.postSignUp(),
    onSuccess: () => {},
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    onSignInMutation,
    onSignUpMutation,
  };
}
