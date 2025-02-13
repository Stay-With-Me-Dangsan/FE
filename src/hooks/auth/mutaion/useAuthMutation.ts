import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import AuthApi from '../../../api-url/auth/auth.api';
import { SignInReqDto } from '../../../types/interface/dto';

export default function useAuthMutation() {
  const navigate = useNavigate();

  const onSignInMutation = useMutation({
    mutationFn: (dto: SignInReqDto) => AuthApi.postSignIn(dto),
    onSuccess: (res) => {
      navigate('/home');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    onSignInMutation,
  };
}
