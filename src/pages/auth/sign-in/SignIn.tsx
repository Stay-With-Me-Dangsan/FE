import { useState } from 'react';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import logo from '../../../asset/images/sign-in-logo.png';
import kakao from '../../../asset/images/sign-in-kakao.png';
import naver from '../../../asset/images/sign-in-naver.png';
import google from '../../../asset/images/sign-in-google.png';
import { Text } from '../../../components/text';
import { useNavigate } from 'react-router-dom';
import useAuthMutation from '../../../hooks/auth/mutaion/useAuthMutation';

export const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { onSignInMutation } = useAuthMutation();

  const onSignInHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    // onSignInMutation.mutate({ email, password });
    navigate('/home');
  };

  const onClickHandler = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    e.stopPropagation();

    const id = e.currentTarget.id;

    switch (id) {
      case 'find-id':
        navigate('/auth/find-id');
        break;
      case 'find-password':
        navigate('/auth/find-password');
        break;
      case 'sign-in':
        navigate('/auth/sign-up');
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center overflow-x-hidden overflow-y-auto">
      <div className="w-[20px] h-full bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]" />
      <div className="h-full px-[40px] flex flex-col items-center">
        <div className="mb-14">
          <img src={logo} alt="sign-in-logo" width={383} />
        </div>

        <div className="w-full flex flex-col gap-10 mb-20">
          <div className="flex flex-col gap-4">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일 주소" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </div>
          <div>
            <Button text="입장하기" onClick={(e) => onSignInHandler(e)} />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-10">
            <Text value="SNS계정으로 간편가입하기" color="gray" />
          </div>

          <div className="w-full flex justify-center gap-5 mb-20">
            <img src={kakao} alt="kakao" width={80} />
            <img src={naver} alt="naver" width={80} />
            <img src={google} alt="google" width={80} />
          </div>

          <div className="flex gap-4 max-lg:mb-10">
            <Text value="아이디 찾기" color="gray" id="find-id" onClick={onClickHandler} />
            <Text value="비밀번호 찾기" color="gray" id="find-password" onClick={onClickHandler} />
            <Text value="회원가입" color="gray" id="sign-in" onClick={onClickHandler} />
          </div>
        </div>
      </div>
      <div className="w-[20px] h-full bg-gradient-to-l from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]" />
    </div>
  );
};
