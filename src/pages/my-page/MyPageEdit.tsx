import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { userIdAtom, clearJwtAtom } from '../../store';
import { useEffect, useState } from 'react';
import { AuthButton } from '../../components/button';
import mypageEdit_profile from '../../asset/images/mypageEdit_profile.png';
import { useDeviceLayout } from '../../hooks/useDeviceLayout';
import rightArrow from '../../asset/images/rightArrow.png';
import { Alert } from '../../components/popup';

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

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { isMobile } = useDeviceLayout();
  const { getMyPageMutation, updateEmailMutation, updatePwMutation, logOutMutation } = useAuthMutation();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };

  useEffect(() => {
    if (userId === null) return;

    if (!userId) {
      navigate('/mypageNl');
      return;
    }
    getMyPageMutation.mutate(userId, {
      onSuccess: (data) => {
        console.log('user:', data);
        const user = data.data.data.result;
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
    updateEmailMutation.mutate(
      { userId: userId!, email },
      {
        onSuccess: () => {
          setUserInfo((prev) => (prev ? { ...prev, email } : undefined));
          setIsEditing(false);
        },
        onError: (err) => {
          console.error(err);
        },
      },
    );
  };
  const savePw = async () => {
    updatePwMutation.mutate(
      { userId: userId!, password },
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
        showAlert('로그아웃 되셨습니다.');
        navigate('/');
      },
      onError: (err) => {
        console.error(err);
        showAlert('로그아웃 실패입니다.');
      },
    });
  };

  return (
    <div className="h-full flex justify-center overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-[960px] flex flex-col items-center overflow-y-auto">
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
                  <img src={rightArrow} alt="rightArrow" className="ml-auto" />
                </div>
                <div className="flex justify-between w-full">
                  <Text value="비밀번호 변경" color="gray" />
                  <span>{userInfo?.password}</span>
                  <img src={rightArrow} alt="rightArrow" className="ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] absolute bottom-[150px] justify-center text-center">
          <div className="mb-5 underline-offset-1 ">
            <Text value="계정탈퇴" color="gray" />
          </div>
          <AuthButton text="로그아웃" onClick={(e) => logOutHandler(e)} color="purple" />
        </div>
        {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
      </div>
    </div>
  );
};
