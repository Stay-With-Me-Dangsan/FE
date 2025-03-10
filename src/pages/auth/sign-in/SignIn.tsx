import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import logo from '../../../asset/images/sign-in-logo.png';
import kakao from '../../../asset/images/sign-in-kakao.png';
import naver from '../../../asset/images/sign-in-naver.png';
import google from '../../../asset/images/sign-in-google.png';
import { Text } from '../../../components/text';
import { useNavigate } from 'react-router-dom';
import useAuthMutation from '../../../hooks/auth/mutaion/useAuthMutation';
import { AuthLayout } from '../_components';
import { Image } from '../../../components/image';
import { Margin } from '../../../components/margin';
import { ImageTypeEnum } from '../../../constant/enum';

export const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { onSignInMutation } = useAuthMutation();

  const onSignInHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    onSignInMutation.mutate({ email, password });
  };

  const naverState = Math.random().toString(36).substring(2, 13);
  const KAKAO_AUTH_URL = `${process.env.KAKAO_REDIRECT_URL}`;
  const NAVER_AUTH_URL = `${process.env.NAVER_REDIRECT_URL}&state=${naverState}`;
  const GOOGLE_AUTH_URL = `${process.env.GOOGLE_REDIRECT_URL}`;

  const onClickHandler = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    e.stopPropagation();

    const id = e.currentTarget.id;

    switch (id) {
      case 'find-id':
        navigate('/auth/findEmail');
        break;
      case 'find-password':
        navigate('/auth/findPassword');
        break;
      case 'sign-up':
        navigate('/auth/signUp');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AuthLayout>
        <Image src={logo} type={ImageTypeEnum.LARGE_LOGO} alt="sign-in-logo" />

        <Margin direction="bottom" size={14} />

        <div className="w-full flex flex-col gap-4">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일 주소" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </div>

        <Margin direction="bottom" size={14} />

        <div className="w-full">
          <Button text="입장하기" onClick={(e) => onSignInHandler(e)} color="purple" />
        </div>

        <Margin direction="bottom" size={14} />

        <div className="w-full flex justify-center gap-20">
          <Image src={kakao} type={ImageTypeEnum.SMALL} alt="kakao" />

          <Image src={naver} type={ImageTypeEnum.SMALL} alt="naver" />

          <Image src={google} type={ImageTypeEnum.SMALL} alt="google" />
        </div>

        <Margin direction="bottom" size={14} />

        <div className="w-full flex justify-center gap-10">
          <Text value="아이디 찾기" color="gray" id="find-id" onClick={onClickHandler} />
          <Text value="비밀번호 찾기" color="gray" id="find-password" onClick={onClickHandler} />
          <Text value="회원가입" color="gray" id="sign-up" onClick={onClickHandler} />
        </div>
      </AuthLayout>
    </>
  );
};
