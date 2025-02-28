import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import AuthApi from '../../../api-url/auth/auth.api';
import { useSetAtom } from 'jotai';
import { jwtStore } from '../../../store';
import { ISignInDto } from '../../../types/dto/auth';

export default function useAuthMutation() {
  const navigate = useNavigate();

  const setJwtToken = useSetAtom(jwtStore.setJwt);

  const onSignInMutation = useMutation({
    mutationFn: (dto: ISignInDto) => AuthApi.postSignIn(dto),
    onSuccess: (res) => {
      const { accessToken } = res.data.data;

      setJwtToken(accessToken);

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
