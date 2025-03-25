import { AuthLayout } from '../_components';
import { AuthInput, PasswordInput, VerifiInput } from '../../../components/input';
import { AuthButton } from '../../../components/button';
import { TermsAgreement, Alert } from '../../../components/popup';
import { useDeviceLayout } from '../../../hooks/useDeviceLayout';
import logo from '../../../asset/images/logo.png';
import { ISignUpDto } from '../../../types/dto/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuthMutation from '../../../hooks/auth/mutaion/useAuthMutation';
import { useEffect } from 'react';

export const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ISignUpDto>({ mode: 'all' });

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const nickname = watch('nickname');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const [allChecked, setAllChecked] = useState(false);
  const [code, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const isValidNickname = nickname ? /^(?=.*\d)[A-Za-z가-힣\d]{3,12}$/.test(nickname) : false;

  const { onSignUpMutation, sendEmailMutation, verifyCodeMutation } = useAuthMutation();

  const { isMobile } = useDeviceLayout();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };

  // 인증번호 전송
  const sendVerificationCode = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.stopPropagation();

    if (!email) {
      setErrorMessage('이메일을 입력해 주세요.');
      return;
    }

    sendEmailMutation.mutate(email, {
      onSuccess: (res) => {
        alert('인증번호가 이메일로 전송되었습니다.');
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  // 이메일 인증 코드 확인
  const verifyCode = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.preventDefault();

    if (!email || !code) {
      showAlert('이메일과 인증 코드를 입력해 주세요.');
      return;
    }

    if (code.length !== 6) {
      setErrorMessage('인증 코드가 올바르지 않습니다.');
      return;
    }

    verifyCodeMutation.mutate(
      { email, code },
      {
        onSuccess: (res) => {
          const isValid = res.data?.data;
          if (isValid) {
            showAlert('이메일 인증이 완료되었습니다.');
          } else {
            showAlert('인증 코드가 올바르지 않습니다.');
          }
        },
        onError: (err) => {
          console.error(err);
          showAlert('인증에 실패했습니다.');
        },
      },
    );
    setIsVerified(true);
  };

  /** 회원가입 요청 */
  const onSubmit = async (data: ISignUpDto) => {
    if (!isVerified) {
      showAlert('이메일 인증을 완료해주세요.');
      return;
    }

    if (!isValid) {
      showAlert('모든 필드 확인.');
      return;
    }
    if (!allChecked) {
      showAlert('모든 필수 항목에 동의해야 합니다.');
      return;
    }

    onSignUpMutation.mutate(data);
  };

  return (
    <AuthLayout>
      <div
        className={`${isMobile ? '' : ' px-[40px] py-[50px]'} relative w-full h-full flex flex-col items-center overflow-y-auto`}>
        <div className="mb-14 flex flex-col items-center text-center">
          <Link to={'/home'}>
            <img src={logo} alt="logo" width={160} />
          </Link>
          <h1 className="mt-4 text-lg font-semibold">반가워요!</h1>
          <h1 className="text-lg font-semibold">함께 하기까지 얼마 남지 않았어요 :D</h1>
        </div>

        {/* 회원가입폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
          {/* 1. 닉네임 */}
          <div className="">
            <AuthInput
              type="text"
              placeholder="닉네임 (최소 3~12 , 숫자1개)"
              {...register('nickname', {
                required: '닉네임을 입력해주세요.',
              })}
              errorMessage={errors.nickname?.message}
              isValid={!errors.nickname && !isValidNickname}
            />
            {/* 2. 성별 , 생년월일일 */}
            <div className={`${isMobile ? '' : 'flex gap-4'}`}>
              {/* 성별 */}
              <div
                className={` ${isMobile ? 'grid text-center' : 'flex'} p-4 gap-4 justify-center shadow-md w-full max-w-md my-4 border-[3px] rounded-[12px]`}>
                <h2 className="leading-loose text-lg font-bold">성별</h2>
                <div className={` flex gap-4 `}>
                  {['male', 'female', 'other'].map((gender) => (
                    <label
                      key={gender}
                      className={`flex items-center justify-center 
                        ${isMobile ? ' w-8 y-6' : ' w-20 y-12'} border rounded-md cursor-pointer transition-colors ${
                          watch('gender') === gender
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-white-100 text-gray-700 border-gray-300'
                        }`}>
                      <input
                        type="radio"
                        value={gender}
                        {...register('gender', { required: '성별을 선택해주세요.' })}
                        className={`w-full hidden h-[74px] p-2 my-4 border-[3px] rounded-[12px] ${errors.nickname ? 'border-red-500' : 'border-purple-500'}`}
                      />
                      {gender === 'male' && '남자'}
                      {gender === 'female' && '여자'}
                      {gender === 'other' && '기타'}
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
              </div>

              {/* 생년월일 */}
              <div className="w-full">
                <AuthInput
                  type="number"
                  placeholder="생년월일 (6자리)"
                  {...register('birth', {
                    required: '생년월일을 입력해주세요.',
                    pattern: {
                      value: /^\d{6}$/,
                      message: '생년월일은 6자리 숫자여야 합니다.',
                    },
                  })}
                  errorMessage={errors.birth?.message}
                  isValid={!errors.birth && !!watch('birth')}
                  className="w-full p-2 my-4 border-[3px] rounded-[12px] border-gray-300"
                />
              </div>
            </div>
            {/*3. 이메일 */}
            <div className="  items-center space-x-2">
              <VerifiInput
                type="email"
                value={email}
                placeholder="이메일"
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: '올바른 이메일 형식이어야 합니다.',
                  },
                })}
                onClick={(e) => sendVerificationCode(e)}
                onChange={(e) => setEmail(e.target.value)}
                isVerified={isVerified}
                isValid={!!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                // isValid={isValid}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
            {/*3-1. 인증번호 입력 */}

            <div className="flex items-center space-x-2">
              {
                <VerifiInput
                  type="code"
                  placeholder="인증번호 입력"
                  value={code}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  onClick={(e) => {
                    e?.preventDefault();
                    verifyCode();
                  }}
                  isVerified={false}
                  isValid={code.length === 6}
                  // className="w-full h-[74px] p-2 my-4 border-[3px] rounded-[12px] border-gray-300"
                />
              }
            </div>

            {/*4. 비밀번호 */}
            <div>
              <PasswordInput
                {...register('password', {
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                    message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
                  },
                })}
                placeholder="비밀번호 (영문 대소문자,숫자,특수문자 포함)"
                errorMessage={errors.password?.message}
                value={password || ''}
              />
            </div>
            {/*5. 비밀번호 확인 */}
            <div className="mb-4">
              <PasswordInput
                {...register('confirmPassword', {
                  required: '비밀번호를 다시 입력해주세요.',
                  validate: (value: any) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
                })}
                placeholder="비밀번호 확인"
                errorMessage={errors.confirmPassword?.message}
                value={confirmPassword || ''}
              />
            </div>
          </div>
          {/* </form> */}
          {/*6. 전체 동의 항목 */}
          <TermsAgreement />
          <div>
            <AuthButton type="submit" text="회원가입" isValid={isValid} />
          </div>
          {/*7. 회원가입 버튼 */}

          {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
        </form>
      </div>
    </AuthLayout>
  );
};
