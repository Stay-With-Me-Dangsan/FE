import { AuthLayout } from '../_components';
import { useEffect, useState } from 'react';
import { AuthInput, VerifiInput } from '../../../components/input';
import { AuthButton } from '../../../components/button';
import logo from '../../../asset/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDeviceLayout } from '../../../hooks/useDeviceLayout';
import useAuthMutation from '../../../hooks/auth/mutaion/useAuthMutation';
import { IfindEmailDto } from '../../../types/dto/auth';
import { Alert } from '../../../components/popup';
import { Margin } from '../../../components/margin';
export const FindEmail = () => {
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const isValidBirth = /^\d{6}$/.test(birth); // 생년월일 유효성 체크 상태
  const isValidNickname = /^(?=.*\d)[A-Za-z가-힣\d]{3,12}$/.test(nickname); // 닉네임 유효성 체크 상태
  const [email, setEmail] = useState<string | null>(null);
  const [createdDate, setCreatedDate] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { isMobile } = useDeviceLayout();
  const { onFindEmailMutation } = useAuthMutation();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };

  const handleFindEmail = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    if (!isValidBirth) {
      showAlert('생년월일을 입력해주세요.');
      return;
    }

    if (!isValidNickname) {
      showAlert('닉네임임을 입력해주세요.');
      return;
    }

    setErrorMessage('');
    setEmail(null);
    setIsVerified(false);

    onFindEmailMutation.mutate(
      { nickname, birth },
      {
        onSuccess: (res) => {
          const user = res.data.data.user;
          if (user.email && user.createdDate) {
            setEmail(user.email);
            setCreatedDate(new Date(user.createdDate).toLocaleDateString());
            setIsVerified(true);
          } else {
            setErrorMessage('입력한 정보와 일치하는 아이디가 없습니다.');
          }
        },
        onError: () => {
          setErrorMessage('이메일 찾기 실패');
        },
      },
    );
  };

  return (
    <AuthLayout>
      <div className="w-full h-full py-[50px] flex flex-col items-center overflow-y-auto">
        <div className="mb-14">
          <Link to={'/home'}>
            <img src={logo} alt="logo" width={160} />
          </Link>
        </div>

        <div className="w-full ">
          <div className="w-full z-50 flex">
            <Link
              to="/auth/findEmail"
              className={`${isMobile ? 'py-2' : 'py-6 px-4'} flex-1 flex justify-center items-center border-r border-gray-300`}>
              <p className="font-bold">아이디 찾기</p>
            </Link>
            <Link
              to="/auth/findPassword"
              className={`${isMobile ? 'py-2' : 'py-6 px-4'} flex-1 flex justify-center items-center border-2 rounded-2 bg-gray-200 text-gray-400`}>
              <p>비밀번호 찾기</p>
            </Link>
          </div>

          <div className="w-full flex flex-col gap-10 mb-20 mt-10 px-[40px]">
            <div className="flex flex-col gap-4">
              {email ? (
                <>
                  <div className="w-full p-2 border-2 rounded">
                    <p className={`${isMobile ? 'text-sm font-semibold' : 'text-lg font-semibold'}`}>
                      가입하신 이메일 계정을 찾았습니다.
                    </p>
                    <p className={`${isMobile ? 'text-sm font-semibold' : 'text-lg font-semibold'}`}>
                      아래 계정으로 로그인하세요
                    </p>
                    <div className={`${isMobile ? 'grid' : 'flex'}`}>
                      <p className=" mr-2">가입된 계정</p>
                      <span className="text-gray-400">{createdDate} 가입</span>
                    </div>
                    <div className={`${isMobile ? 'grid' : 'flex'}`}>
                      <p className=" mr-2 text-gray-400">이메일</p>
                      <span className={`${isMobile ? 'text-sm' : ''}`}>{email}</span>
                    </div>
                  </div>
                  <Margin direction="bottom" size={14} />

                  <AuthButton text="로그인 하기" to="/auth" color="purple" />
                </>
              ) : (
                <>
                  <AuthInput
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임"
                    isValid={nickname ? isValidNickname : undefined}
                    errorMessage={
                      nickname && !isValidNickname ? '닉네임은 3~12자의 영문, 숫자, 특수문자가 포함되야 합니다.' : ''
                    }
                  />

                  <div className="flex relative w-full">
                    <VerifiInput
                      type="birth"
                      value={birth}
                      onChange={(e) => setBirth(e.target.value)}
                      onClick={(e) => handleFindEmail(e)}
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
      {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
    </AuthLayout>
  );
};
