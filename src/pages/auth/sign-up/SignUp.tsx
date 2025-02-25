import { AuthLayout } from '../_components';
import { AuthInput, PasswordInput, VerifiInput } from '../../../components/input';
import { AuthButton } from '../../../components/button';
import { useDeviceLayout } from '../../../hooks/useDeviceLayout';
import logo from '../../../asset/images/logo.png';
import { ISignUpReq, IEmailCodeReq } from '../../../types/interface/auth/req';
import React, { useState } from 'react';
import { atom, useAtom } from 'jotai';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from 'src/components/button';
import useAuthMutation from '../../../hooks/auth/mutaion/useAuthMutation';

const isVerifiedAtom = atom(false);
const showVerificationInputAtom = atom(false);

export const SignUp: React.FC = () => {
  const { isMobile } = useDeviceLayout();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ISignUpReq>({ mode: 'onChange' });

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const password = watch('password');
  const [nickname, setNickname] = useState('');

  const [showPassword, setShowPassword] = useState(false); // ✅ 비밀번호 보이기 상태 관리

  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const [isValid, setIsBirthValid] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [serverCode, setServerCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { onSignUpMutation, sendEmailMutation } = useAuthMutation();

  const [allChecked, setAllChecked] = useState(false);
  const [terms, setTerms] = useState<{
    age: boolean;
    termsOfUse: boolean;
    privacy: boolean;
    thirdParty: boolean;
    location: boolean;
  }>({
    age: false,
    termsOfUse: false,
    privacy: false,
    thirdParty: false,
    location: false,
  });

  const handleIndividualChange = (key: keyof typeof terms) => {
    setTerms((prev) => {
      const updatedTerms = { ...prev, [key]: !prev[key] };
      const allSelected = Object.values(updatedTerms).every(Boolean);
      setAllChecked(allSelected);
      return updatedTerms;
    });
  };

  const handleAllChange = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setTerms({
      age: newCheckedState,
      termsOfUse: newCheckedState,
      privacy: newCheckedState,
      thirdParty: newCheckedState,
      location: newCheckedState,
    });
  };

  // 인증번호 전송
  const sendVerificationCode = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.stopPropagation();

    if (!email) {
      setErrorMessage('이메일을 입력해 주세요.');
      return;
    }
    (async () => {
      await sendEmailMutation.mutateAsync(email);
      alert('인증번호가 이메일로 전송되었습니다.');
    })();

    alert('인증번호가 이메일로 전송되었습니다.');
  };

  // 이메일 인증 코드 확인
  const verifyCode =
    (data: IEmailCodeReq) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: IEmailCodeReq) => {
      e.stopPropagation();

      if (!email || !verificationCode) {
        alert('이메일과 인증 코드를 입력해 주세요.');
        return;
      }
      if (verificationCode.length === 6) {
        setIsVerified(true);
        setErrorMessage('');
      } else {
        setErrorMessage('인증 코드가 올바르지 않습니다.');
      }
      // (async () => {
      //   await verifyCodeMutation.mutateAsync(data);
      //   setIsVerified(true);
      // })();
    };

  /** 회원가입 요청 */
  const onSubmit = async (data: ISignUpReq) => {
    if (!isVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }
    if (!termsAccepted || !privacyAccepted) {
      alert('모든 필수 항목에 동의해야 합니다.');
      return;
    }

    onSignUpMutation.mutate(data);
  };

  return (
    <AuthLayout>
      <div className="relative w-full h-full px-[40px] py-[50px] flex flex-col items-center overflow-y-auto">
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
              placeholder="닉네임 (한글, 영어, 숫자 2~6자리)"
              {...register('nickname', {
                pattern: {
                  value: /^[가-힣a-zA-Z0-9]{2,8}$/,
                  message: '닉네임은 한글, 영어, 숫자 포함 2~6자리여야 합니다.',
                },
              })}
              errorMessage={errors.nickname?.message}
              isValid={!errors.nickname && !!watch('nickname')}
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
            {!isVerified && (
              <div className="flex items-center space-x-2">
                {
                  <VerifiInput
                    type="code"
                    placeholder="인증번호 입력"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    onClick={() => verifyCode({ email, verificationCode })}
                    isVerified={false}
                    isValid={verificationCode.length === 6}
                    // className="w-full h-[74px] p-2 my-4 border-[3px] rounded-[12px] border-gray-300"
                  />
                }
              </div>
            )}
            {/*4. 비밀번호 */}
            <div>
              <PasswordInput
                value={password}
                // onChange={(e) => setPassword(e.target.value)}
                {...register('password', {
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: '비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.',
                  },
                })}
                placeholder="비밀번호 (영문 대소문자, 특수문자 포함)"
                errorMessage={errors.password?.message}
              />
            </div>
            {/*5. 비밀번호 확인 */}
            <div className="mb-4">
              <PasswordInput
                value={password}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                {...register('confirmPassword', {
                  required: '비밀번호를 다시 입력해주세요.',
                  validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
                })}
                placeholder="비밀번호 확인"
                errorMessage={errors.confirmPassword?.message}
              />
            </div>
          </div>
        </form>
        {/*6. 전체 동의 항목 */}
        <div className="w-full mt-4">
          <div
            className="flex items-center bg-purple-500 text-white p-3 border-[3px] rounded-[12px] cursor-pointer"
            onClick={handleAllChange}>
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleAllChange}
              className="mr-2 w-5 h-5 accent-white"
            />
            <span className="font-medium">전체 동의</span>
          </div>

          {/* 개별 동의 항목 */}
          <div className="bg-white rounded-lg mt-3 p-4 space-y-3">
            {[
              { key: 'age', label: '만 14세 이상입니다.' },
              { key: 'termsOfUse', label: '이용약관 동의' },
              { key: 'privacy', label: '개인정보수집 및 이용동의' },
              { key: 'thirdParty', label: '개인정보 제 3자 제공 및 동의' },
              { key: 'location', label: '위치정보이용약관 동의' },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center p-2 border rounded-md">
                <input
                  type="checkbox"
                  checked={terms[key as keyof typeof terms]} // 타입 명시
                  onChange={() => handleIndividualChange(key as keyof typeof terms)} // 타입 명시
                  className="mr-2 w-5 h-5 accent-purple-500"
                />
                <span className="text-sm">
                  <span className="text-purple-500 font-semibold">[필수]</span> {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/*7. 회원가입 버튼 */}
        {<AuthButton type="submit" text="회원가입" isSubmitting={isSubmitting} />}

        <div className="w-full">
          <div className="w-full flex flex-col gap-10 mb-20"></div>
        </div>
      </div>
    </AuthLayout>
  );
};
