import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { userIdAtom, clearJwtAtom, clearUserAtom } from '../../store/auth/authAtom';
import { useEffect, useState } from 'react';
import { AuthButton } from '../../components/button';
import mypageEdit_profile from '../../asset/images/mypageEdit_profile.png';
import { useDeviceLayout } from '../../hooks/useDeviceLayout';
import vector from '../../asset/images/Vector.png';

import { Text } from '../../components/text';
import useAuthMutation from '../../hooks/auth/mutaion/useAuthMutation';

export const MyPageEdit = () => {
  const [userId] = useAtom(userIdAtom);
  const [userInfo, setUserInfo] = useState<{ email: string; password: string; nickname: string } | undefined>(
    undefined,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setClearJwt = useSetAtom(clearJwtAtom);
  const setClearUser = useSetAtom(clearUserAtom);

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { isMobile } = useDeviceLayout();
  const { getMyPageMutation, updateEmailMutation, updatePwMutation, logOutMutation } = useAuthMutation();

  useEffect(() => {
    if (!userId) {
      navigate('/mypageNl');
      return;
    }
    getMyPageMutation.mutate(userId, {
      onSuccess: (data) => {
        const user = data.data.data.user;
        setUserInfo({
          email: user.email,
          password: user.password,
          nickname: user.nickname,
        });
        setEmail(user.email);
        setPassword(user.password);
      },
    });
  }, [userId]);

  const saveEmail = async () => {
    if (!userId) {
      navigate('/mypageNl');
      return;
    }

    updateEmailMutation.mutate(
      { userId, email },
      {
        onSuccess: () => {
          setUserInfo((prev) => (prev ? { ...prev, email } : undefined));
          setIsEditing(false);
          alert('마이페이지지 변경 성공공');
        },
        onError: (err) => {
          console.error(err);
          alert('마이페이지 변경에 실패했습니다.');
        },
      },
    );
  };
  const savePw = async () => {
    if (!userId) {
      navigate('/mypageNl');
      return;
    }

    updatePwMutation.mutate(
      { userId, password },
      {
        onSuccess: () => {
          setUserInfo((prev) => (prev ? { ...prev, password } : undefined));
          setIsEditing(false);
          alert('비밀번호 변경 성공');
        },
        onError: (err) => {
          console.error(err);
          alert('비밀번호 변경에 실패했습니다.');
        },
      },
    );
  };

  const logOutHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    logOutMutation.mutate(undefined, {
      onSuccess: () => {
        setClearJwt();
        setClearUser();
        alert('로그아웃 되셨습니다.');
        navigate('/');
      },
      onError: (err) => {
        console.error(err);
        alert('로그아웃 실패입니다.');
      },
    });
  };

  return (
    <div className="h-full flex justify-center overflow-x-hidden overflow-y-auto">
      <div
        className={`${isMobile ? '' : 'w-[20px] h-full bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]'}`}
      />
      <div
        className={`${isMobile ? 'w-full' : 'w-[80vw] px-10 pb-[50px]'} max-w-[960px] flex flex-col items-center overflow-y-auto`}>
        <div className="w-full">
          <div className="w-full border-b-[1px] border-[#CDCDCD]">
            <div className="grid mb-14 justify-center">
              <img src={mypageEdit_profile} alt="mypageEdit_profile" className="ml-auto" />
              <h2>{userInfo?.nickname}</h2>
            </div>
          </div>

          <div className="w-full  border-t-[1px] border-[#CDCDCD]">
            <div className="grid pt-[30px] gap-5">
              <div className=" justify-between">
                <p className="text-purple-400 font-bold ">회원정보 변경</p>
              </div>
              <div className=" flex flex-col  gap-6">
                <div className="flex justify-between w-full">
                  <Text value="이메일 변경" color="gray" />
                  <span>{userInfo?.email}</span>
                  <img src={vector} alt="vector" className="ml-auto" />
                </div>
                <div className="flex justify-between w-full">
                  <Text value="비밀번호 변경" color="gray" />
                  <span>{userInfo?.email}</span>
                  <img src={vector} alt="vector" className="ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] absolute bottom-[105px] justify-center">
          <div className="mb-5 underline-offset-1 ">
            <Text value="계정탈퇴" color="gray" />
          </div>
          <AuthButton text="로그아웃" onClick={(e) => logOutHandler(e)} color="purple" />
        </div>
      </div>
      <div
        className={`${isMobile ? '' : 'w-[20px] h-full bg-gradient-to-l from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]'}`}
      />
    </div>
  );
};
