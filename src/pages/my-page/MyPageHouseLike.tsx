import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HouseItem } from '../../pages/my-page/components/HouseItem';
import useAuthMutation from '../../hooks/auth/mutaion/useAuthMutation';
import myapge_list from '../../asset/images/myapge_list.png';
import { IHouseDetailDto } from '../../types/dto/house';

export const MyPageHouseLike = () => {
  const navigate = useNavigate();
  const [houses, setHouse] = useState<IHouseDetailDto[]>([]);
  const { gethouseLikeMutation, posthouseLikeCancelMutation } = useAuthMutation();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };

  useEffect(() => {
    gethouseLikeMutation.mutate(undefined, {
      onSuccess: (res: any) => {
        const houseList = res.data.data.result;
        setHouse(houseList);
      },
      onError: () => {
        showAlert('업로드한 집 불러오기 실패');
        console.error();
      },
    });
  }, []);

  const handleCancelLike = (houseDetailId: number) => {
    const confirmCancel = window.confirm('좋아요를 취소하시겠습니까?');
    if (!confirmCancel) return;

    posthouseLikeCancelMutation.mutate(houseDetailId, {
      onSuccess: () => {
        // 좋아요 취소 후 리스트 새로고침
        gethouseLikeMutation.mutate(undefined, {
          onSuccess: (res) => {
            const houseList = res.data.data.result;
            setHouse(houseList);
          },
        });
      },
      onError: (err) => {
        showAlert('좋아요 취소 실패');
        console.error(err);
      },
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full inline-flex items-center pt-8">
        <div className="w-full flex justify-start gap-1 ">
          <div className="float-left flex">
            <p>총 {houses.length}개</p>
          </div>
        </div>
        <div className="float-right content-center">
          <h1>
            <img src={myapge_list} alt="myapge_list" />
          </h1>
        </div>
      </div>
      <div className="w-full mt-10">
        {houses.map((house) => (
          <HouseItem
            key={house.houseDetailId}
            {...house}
            isLiked={true}
            onHeartClick={() => handleCancelLike(house.houseDetailId)}
          />
        ))}
      </div>
    </div>
  );
};
