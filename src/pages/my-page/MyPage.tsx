import { useAtom } from 'jotai';
import { userIdAtom, decodeJwt } from '../../store/jwt';
import { useEffect, useState, useRef } from 'react';
import person from '../../asset/images/person.png';
import rightArrow from '../../asset/images/rightArrow.png';
import mypage_nickname_check from '../../asset/images/mypage_nickname_check.png';
import pen from '../../asset/images/pen.png';
import { useNavigate } from 'react-router-dom';
import { MypageLayout } from './components';
import { IPatchUpdateNicknameDto } from '../../types/dto/auth';
import useAuthMutation from '../../hooks/auth/mutaion/useAuthMutation';
import { Alert } from '../../components/popup';
import { useDeviceLayout } from '../../hooks/useDeviceLayout';

export const MyPage = () => {
  const [userId] = useAtom(userIdAtom);
  const [userInfo, setUserInfo] = useState<{ nickname: string; email: string } | null>(null);
  const [nickname, setNickname] = useState(userInfo?.nickname || '');
  const nicknameRef = useRef<HTMLParagraphElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { isMobile } = useDeviceLayout();
  const { getMyPageMutation, updateNicknameMutation } = useAuthMutation();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };
  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      const decoded = decodeJwt(token);

      // 유효하지 않은 토큰이거나 userId가 없으면 리다이렉트
      if (!decoded?.userId) {
        showAlert('로그인이 필요합니다!');
        navigate('/mypageNl');
        return;
      }

      getMyPageMutation.mutate(decoded.userId, {
        onSuccess: (data) => {
          const user = data.data.data.user;
          setUserInfo({ nickname: user.nickname, email: user.email });
          setNickname(user.nickname);
        },
        onError: (error) => {
          console.error(' 데이터 불러오기 실패:', error);
          showAlert('유저 정보 불러오기 실패');
        },
      });
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      nicknameRef.current?.focus();
    }, 0);
  };

  const handleSaveClick = () => {
    const newNickname = nicknameRef.current?.innerText.replace(/\s+/g, '').trim();
    const isValidNickname = /^(?=.*\d)[A-Za-z가-힣\d]{3,12}$/.test(newNickname || '');

    if (!newNickname || newNickname.length < 3 || newNickname.length > 12) {
      showAlert('닉네임은3~12자여야 합니다');
      return;
    }

    if (!isValidNickname) {
      showAlert('닉네임에는 숫자가 최소 1개 포함되어야 하며, 한글 또는 영문을 사용할 수 있습니다!');
      return;
    }

    if (newNickname === nickname) {
      setIsEditing(false);
      return;
    }

    updateNicknameMutation.mutate(
      { userId: userId!, nickname: newNickname },
      {
        onSuccess: () => {
          setUserInfo((prev) => (prev ? { ...prev, nickname: newNickname } : prev));
          setNickname(newNickname);
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
        <div className="relative w-full flex flex-col items-center overflow-y-auto">
          <div className="w-full">
            <div className="w-full h-[208px] flex items-center">
              <div className="w-full flex py-5 gap-2">
                <div className="flex flex-col justify-center gap-2">
                  <img src={person} alt="person" width={116} />
                </div>

                <div className="w-full flex flex-col justify-center gap-2 ml-3">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2 text-2xl font-bold">
                      <p
                        ref={nicknameRef}
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onKeyDown={(e) => handleSaveClick()}
                        className={`cursor-pointer focus:outline-none ${isEditing ? 'border-b border-gray-500' : ''}`}>
                        {nickname}
                      </p>

                      <img
                        src={isEditing ? mypage_nickname_check : pen}
                        alt="pen"
                        width={26}
                        height={24}
                        onClick={isEditing ? handleSaveClick : handleEditClick}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-gray-500">{userInfo?.email}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <button onClick={() => navigate('/mypage/edit')}>
                    <img src={rightArrow} alt="rightArrow" className="ml-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
      </MypageLayout>
    </>
  );
};
