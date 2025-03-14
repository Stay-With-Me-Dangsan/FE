import { useAtom } from 'jotai';
import { userIdAtom } from '../../store/auth/authAtom';
import { useEffect, useState } from 'react';
import person from '../../asset/images/person.png';
import vector from '../../asset/images/Vector.png';
import pen from '../../asset/images/pen.png';
import { Link, useNavigate } from 'react-router-dom';
import { MypageLayout } from './components';
import { IPatchUpdateNicknameDto } from '../../types/dto/auth';
import useAuthMutation from '../../hooks/auth/mutaion/useAuthMutation';
// import Alert from '../../components/popup';
import { useDeviceLayout } from '../../hooks/useDeviceLayout';

export const MyPage = () => {
  const [userId] = useAtom(userIdAtom);
  const [userInfo, setUserInfo] = useState<{ nickname: string; email: string } | null>(null);
  const [nickname, setNickname] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { isMobile } = useDeviceLayout();
  const { getMyPageMutation, updateNicknameMutation } = useAuthMutation();

  useEffect(() => {
    if (!userId) return;

    getMyPageMutation.mutate(userId, {
      onSuccess: (data) => {
        const user = data.data.data.user;
        // const user = res.data.data.user || res.data.user;
        setUserInfo({ nickname: user.nickname, email: user.email });
        setNickname(user.nickname);
      },
      onError: (error) => {
        console.error('마이페이지 데이터 불러오기 실패:', error);
      },
    });
  }, [userId]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleBlur = () => {
    saveNickname();
  };

  const saveNickname = async () => {
    if (!userId) {
      alert('로그인이 필요합니다!');
      return;
    }
    updateNicknameMutation.mutate(
      { userId, nickname },
      {
        onSuccess: () => {
          setUserInfo((prev) => (prev ? { ...prev, nickname } : null));
          setIsEditing(false);
        },
        onError: (error) => {
          alert('닉네임 변경 실패');
          console.error('닉네임 변경 실패:', error);
        },
      },
    );
  };

  return (
    <>
      <MypageLayout>
        <div
          className={`${isMobile ? '' : ' px-[40px] py-[50px]'} relative w-full h-full flex flex-col items-center overflow-y-auto`}>
          {/* <div className="relative w-full h-full px-[40px] flex flex-col items-center overflow-y-auto">
           */}

          {/* <div className="w-full h-2 bg-[#f0f0f0] mt-2" /> */}
          <div className="w-full px-10">
            <div className="w-full h-[208px] flex items-center">
              <div className="w-full flex py-5 gap-2">
                <div className="flex flex-col justify-center gap-2">
                  <img src={person} alt="person" width={116} />
                </div>
                <div className="w-full flex flex-col justify-center gap-2">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2 text-2xl font-bold">
                      {isEditing ? (
                        <input
                          type="text"
                          value={userInfo?.nickname}
                          onChange={handleNicknameChange}
                          onBlur={handleBlur}
                          onKeyDown={(e) => e.key === 'Enter' && saveNickname()}
                          autoFocus
                          className="border-b border-gray-500 focus:outline-none"
                        />
                      ) : (
                        <p onClick={() => setIsEditing(true)} className="cursor-pointer">
                          {userInfo?.nickname}
                        </p>
                      )}
                      <img
                        src={pen}
                        alt="pen"
                        width={26}
                        height={24}
                        onClick={() => setIsEditing(true)}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p>{userInfo?.email}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <button onClick={() => navigate('/mypage/edit')}>
                    <img src={vector} alt="vector" width={12} height={28} />
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="w-full h-[222px] border-t-[1px] border-[#CDCDCD]">
            <div className="grid pt-[30px] gap-5">
              <div className=" justify-between">
                <p className="text-purple-400 font-bold ">스테이 윗 미</p>
              </div>
              <div className=" h-[222px] flex flex-col  gap-6">
                <div className="flex justify-between w-full">
                  <p className="text-xl">내가 올린 집</p>
                  <img src={vector} alt="vector" className="ml-auto" />
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-xl">내가 찜한 집</p>
                  <img src={vector} alt="vector" className="ml-auto" />
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-xl">최근 조회한 집</p>
                  <img src={vector} alt="vector" className="ml-auto" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[263px] border-t-[1px] border-[#CDCDCD] mt-[20px]">
            <div className="grid pt-[30px] gap-5">
              <div className=" justify-between">
                <p className="text-purple-400 font-bold ">게시판</p>
              </div>
              <div className=" h-[184px] flex flex-col gap-6">
                <div className="flex justify-between w-full">
                  <p className="text-xl  ">내가 작성한 글</p>
                  <img src={vector} alt="vector" />
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-xl  ">내가 작성한 댓글</p>
                  <img src={vector} alt="vector" />
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-xl ">내가 찜한 게시글</p>
                  <img src={vector} alt="vector" />
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </MypageLayout>
    </>
  );
};
