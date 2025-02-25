import { AuthLayout } from '../_components';
import { useState } from 'react';
import { AuthInput } from '../../../components/input';
import { Link, useNavigate } from 'react-router-dom';
import { AuthButton } from '../../../components/button';
import logo from '../../../asset/images/logo.png';
import { useDeviceLayout } from '../../../hooks/useDeviceLayout';

export const FindPassword = () => {
  const [email, setEmail] = useState('');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // 이메일 유효성 체크 상태
  const [errorMessage, setErrorMessage] = useState<string>(''); // 오류 메시지를 저장할 상태
  const navigate = useNavigate();
  const { isMobile } = useDeviceLayout();

  const onFindPw = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!isValidEmail) {
      setErrorMessage('올바른 이메일을 입력해주세요.');
      return;
    }
    setErrorMessage('');
    alert('클릭!');
  };
  return (
    <AuthLayout>
      <div className="relative w-full h-full px-[40px] py-[50px] flex flex-col items-center overflow-y-auto">
        <div className="mb-14">
          <Link to={'/home'}>
            <img src={logo} alt="logo" width={160} />
          </Link>
        </div>

        <div className="w-full">
          <div className="w-full z-50 flex">
            <Link
              to="/auth/find-email"
              className={`${isMobile ? 'py-2' : 'py-6 px-4'} flex-1 flex justify-center items-center border-2 rounded-2 bg-gray-200 text-gray-400`}>
              <p>아이디 찾기</p>
            </Link>
            <Link
              to="/auth/find-password"
              className={`${isMobile ? 'py-2' : 'py-6 px-4'} flex-1 flex justify-center items-center border-r border-gray-300`}>
              <p className="font-bold">비밀번호 찾기</p>
            </Link>
          </div>

          <div className="w-full flex flex-col gap-10 mb-20 mt-10">
            <h2 className={`${isMobile ? 'font-bold text-sm' : 'font-bold text-2xl'}`}>
              가입하신 이메일로 임시 비밀번호를 보내드려요!
            </h2>
            <div className="flex flex-col gap-4">
              <AuthInput
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="가입시 사용한 이메일 아이디"
                isValid={isValidEmail}
              />
              {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            </div>
          </div>
          {/* <div className="w-full absolute bottom-0"> */}
          <AuthButton
            text="임시 비밀번호 받기"
            onClick={onFindPw}
            color={isValidEmail ? 'purple' : 'gray'}
            disabled={!isValidEmail}
          />
          {/* </div> */}
        </div>
      </div>
    </AuthLayout>
  );
};
