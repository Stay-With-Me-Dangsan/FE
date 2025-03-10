import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userIdAtom } from '../../store/auth/authAtom';
import { useEffect, useState } from 'react';
import { AuthButton } from '../../components/button';
import person from '../../asset/images/person.png';
import back from '../../asset/images/back.png';
import vector from '../../asset/images/Vector.png';
import { Text } from '../../components/text';
import useAuthMutation from '../../hooks/auth/mutaion/useAuthMutation';

export const MyPageEdit = () => {
  const [userId] = useAtom(userIdAtom);
  const [userInfo, setUserInfo] = useState<{ email: string; password: string; nickname: string } | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const { getMyPageMutation, updateEmailMutation, updatePwMutation } = useAuthMutation();

  useEffect(() => {
    if (!userId) return;

    getMyPageMutation.mutate(userId, {
      onSuccess: (data) => {
        setUserInfo({
          email: data.data.data.result.email,
          password: data.data.data.result.password,
          nickname: data.data.data.result.nickname,
        });
        setEmail(data.data.data.result.email);
        setPassword(data.data.data.result.password);
      },
    });
  }, [userId]);

  const saveEmail = async () => {
    if (!userId) {
      alert('로그인이 필요합니다!');
      return;
    }
    updateEmailMutation.mutate(
      { userId, email },
      {
        onSuccess: () => {
          setUserInfo((prev) => (prev ? { ...prev, email } : null));
          setIsEditing(false);
        },
      },
    );
  };
  const savePw = async () => {
    if (!userId) {
      alert('로그인이 필요합니다!');
      return;
    }
    updatePwMutation.mutate(
      { userId, password },
      {
        onSuccess: () => {
          setUserInfo((prev) => (prev ? { ...prev, password } : null));
          setIsEditing(false);
        },
      },
    );
  };

  const logOutHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    navigate('/home');
  };

  return (
    <div className="h-full flex justify-center items-center overflow-y-hidden">
      <div className="w-[20px] h-full bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]" />
      <div className="relative  w-full h-full px-[40px] flex flex-col items-center overflow-y-auto">
        <div className="w-full h-[100px] flex items-center  px-10">
          <img src={back} alt="back" />
        </div>

        <div className="w-full h-2 bg-[#f0f0f0] mt-2" />
        <div className="w-full">
          <div className="w-full border-b-[1px] border-[#CDCDCD]">
            <div className="grid mb-14 justify-center">
              <img src={person} alt="person" width={203} />
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
          <div className="w-full text-center">
            <div className="mb-5 underline-offset-1">
              <Text value="계정탈퇴" color="gray" />
            </div>
            <AuthButton text="로그아웃" onClick={(e) => logOutHandler(e)} color="purple" />
          </div>
        </div>
      </div>

      <div className="w-[20px] h-full bg-gradient-to-l from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]" />
    </div>
  );
};
