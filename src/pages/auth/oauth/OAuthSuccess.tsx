import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { jwtStore, decodedTokenAtom } from '../../../store/jwt';

export const OAuthSuccess: React.FC = () => {
  const [accessToken, setAccessToken] = useAtom(jwtStore);
  const [decoded] = useAtom(decodedTokenAtom);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      setAccessToken(accessToken);
      navigate('/home');
    } else {
      alert(' JWT 토큰 없음');
      navigate('/auth');
    }
  }, [searchParams, setAccessToken, navigate]);

  // useEffect(() => {
  //   if (decoded?.userId) {
  //     console.log('✅ 추출된 userId:', userId);
  //     navigate('/home');
  //   }
  // }, [userId, navigate]);

  return <div>로그인 중...</div>;
};
