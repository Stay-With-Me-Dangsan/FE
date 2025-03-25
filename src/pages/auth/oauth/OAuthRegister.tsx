import { useEffect, useState } from 'react';
import { AuthInput, PasswordInput, VerifiInput } from '../../../components/input';
import { AuthButton } from '../../../components/button';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { jwtStore, decodedTokenAtom } from '../../../store/jwt';
import { useDeviceLayout } from '../../../hooks/useDeviceLayout';
import { useForm } from 'react-hook-form';
import logo from '../../../asset/images/logo.png';
import { AuthLayout } from '../_components';
import useAuthMutation from '../../../hooks/auth/mutaion/useAuthMutation';
import { IOauthRegDto } from '../../../types/dto/auth';
import { Alert } from '../../../components/popup';

export const OAuthRegister: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useAtom(jwtStore);
  const { OauthRegMutation } = useAuthMutation();
  const [decoded] = useAtom(decodedTokenAtom);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };

  const navigate = useNavigate();
  const { isMobile } = useDeviceLayout();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IOauthRegDto>({ mode: 'all' });
  const nickname = watch('nickname');
  const isValidNickname = nickname ? /^(?=.*\d)[A-Za-z가-힣\d]{3,12}$/.test(nickname) : false;

  useEffect(() => {
    const token = searchParams.get('accessToken');
    if (token) {
      setAccessToken(token);
      const url = new URL(window.location.href);
      url.searchParams.delete('accessToken');
      window.history.replaceState({}, '', url.pathname);
    } else {
      showAlert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, []);

  const onSubmit = async (data: IOauthRegDto) => {
    if (!decoded?.userId) {
      showAlert('유저 정보가 유효하지 않습니다.');
      return;
    }

    const payload = {
      ...data,
      userId: decoded.userId,
    };

    OauthRegMutation.mutate(payload, {
      onSuccess: (res) => {
        showAlert('간편 회원가입이 완료되었습니다.');
        navigate('/home');
      },
      onError: () => {
        showAlert('간편 회원가입에 실패했습니다.');
      },
    });
  };

  return (
    <AuthLayout>
      <div
        className={`${isMobile ? '' : ' px-[40px] py-[50px]'} relative w-full h-full flex flex-col items-center overflow-y-auto`}>
        <div className="mb-14 flex flex-col items-center text-center">
          <Link to={'/home'}>
            <img src={logo} alt="logo" width={160} />
          </Link>
          <h1 className="mt-4 text-lg font-semibold">간편 회원가입</h1>
        </div>
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
          </div>

          <div>
            <AuthButton type="submit" text="간편가입하기" isValid={isValid} />
          </div>
          {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
        </form>
      </div>
    </AuthLayout>
  );
};
