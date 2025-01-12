import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import AuthApi from '../../../api-url/auth/auth.api';
import { SignInRequestDto } from '../../../types/interface/dto';

export default function useAuthMutation() {
  const navigate = useNavigate();

  const onSignInMutation = useMutation({
    mutationFn: (dto: SignInRequestDto) => AuthApi.postSignIn(dto),
    onSuccess: (res) => {
      navigate('/home');
    },
    onError: (err) => {},
  });

  return {
    onSignInMutation,
  };
}
