import { AuthLayout } from '../_components';
import { useEffect, useState } from 'react';
import { AuthInput, VerifiInput } from '../../../components/input';
import { AuthButton } from '../../../components/button';
import logo from '../../../asset/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDeviceLayout } from '../../../hooks/useDeviceLayout';

export const FindEmail = () => {
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const isValidBirth = /^\d{6}$/.test(birth); // 생년월일 유효성 체크 상태
  const isValidNickname = /^[가-힣a-zA-Z0-9]{2,8}$/.test(nickname); // 닉네임 유효성 체크 상태
  const [email, setEmail] = useState<string | null>(null);
  const [expiredDt, setExpiredDt] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { isMobile } = useDeviceLayout();

  const onFindId = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    alert('🔹 onFindId 시작!');
    e?.stopPropagation();
    alert('🔹 e.stopPropagation() 완료!');

    if (!isValidBirth || !isValidNickname) {
      setErrorMessage('모든 필드를 입력해 주세요.');
      alert('no!!');
      return;
    }
    setEmail('sujinego3971@naver.com');
    setExpiredDt('2025-02-24');
    // 인증 로직 (예시)
    setIsVerified(true);
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
              className={`${isMobile ? 'py-2' : 'py-6 px-4'} flex-1 flex justify-center items-center border-r border-gray-300`}>
              <p className="font-bold">아이디 찾기</p>
            </Link>
            <Link
              to="/auth/find-password"
              className={`${isMobile ? 'py-2' : 'py-6 px-4'} flex-1 flex justify-center items-center border-2 rounded-2 bg-gray-200 text-gray-400`}>
              <p>비밀번호 찾기</p>
            </Link>
          </div>

          <div className="w-full flex flex-col gap-10 mb-20 mt-10">
            <div className="flex flex-col gap-4">
              {email ? (
                <div className="w-full p-2 border-2 rounded">
                  <p className={`${isMobile ? 'text-sm font-semibold' : 'text-lg font-semibold'}`}>
                    가입하신 이메일 계정을 찾았습니다.
                  </p>
                  <p className={`${isMobile ? 'text-sm font-semibold' : 'text-lg font-semibold'}`}>
                    아래 계정으로 로그인하세요
                  </p>
                  <div className={`${isMobile ? 'grid' : 'flex'}`}>
                    <p className=" mr-2">가입된 계정</p>
                    <span className="text-gray-400">{expiredDt} 가입</span>
                  </div>
                  <div className={`${isMobile ? 'grid' : 'flex'}`}>
                    <p className=" mr-2 text-gray-400">이메일</p>
                    <span className={`${isMobile ? 'text-sm' : ''}`}>{email}</span>
                  </div>
                  <AuthButton text="로그인 하기" to="/auth" color="purple" />
                </div>
              ) : (
                <>
                  <AuthInput
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임"
                    isValid={nickname ? isValidNickname : undefined} // 값이 있으면 유효성 검사 적용
                    errorMessage={
                      nickname && !isValidNickname ? '닉네임은 2~10자의 영문, 한글, 숫자만 가능합니다.' : ''
                    }
                  />

                  <div className="flex relative w-full">
                    <VerifiInput
                      type="birth"
                      value={birth}
                      onChange={(e) => setBirth(e.target.value)}
                      onClick={(e) => onFindId(e)}
                      isVerified={isVerified}
                      isValid={isValidBirth}
                      placeholder="생년월일"
                    />
                  </div>
                  {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
