import { useState } from 'react';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import logo from '../../../asset/images/sign-in-logo.png';
import kakao from '../../../asset/images/sign-in-kakao.png';
import naver from '../../../asset/images/sign-in-naver.png';
import google from '../../../asset/images/sign-in-google.png';
import { Text } from '../../../components/text';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignInHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    console.log('email: ', email);
    console.log('password: ', password);
  };

  return (
    <div className="relative left-[50%] translate-x-[-50%] w-[1000px] h-[100vh] pt-16 pb-10 pl-8 pr-8 flex flex-col justify-between items-center border-l-[1px] border-r-[1px] border-[#CDCDCD]">
      <div className="mb-14">
        <img src={logo} alt="sign-in-logo" width={383} />
      </div>

      <div className="w-full flex flex-col gap-10 mb-8">
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

      <div className="w-full flex flex-col items-center">
        <div className="mb-10">
          <Text value="SNS계정으로 간편가입하기" color="gray" />
        </div>

        <div className="w-full flex justify-center gap-20 mb-20">
          <img src={kakao} alt="kakao" width={80} />
          <img src={naver} alt="naver" width={80} />
          <img src={google} alt="google" width={80} />
        </div>

        <div className="flex gap-10">
          <Text value="아이디 찾기" color="gray" />
          <Text value="|" color="gray" />
          <Text value="비밀번호 찾기" color="gray" />
          <Text value="|" color="gray" />
          <Text value="회원가입" color="gray" />
        </div>
      </div>
    </div>
  );
};
