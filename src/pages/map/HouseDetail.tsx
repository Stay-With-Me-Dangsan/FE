import { useAtom } from 'jotai';
import { userIdAtom } from '../../store/jwt';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useHouseDetailQuery } from '../../hooks/house/query';
import { useHouseMutation } from '../../hooks/house/mutation/useHouseMutation';
import { getTimeAgo } from '../../components/time/getTimeAgo';

import { Alert } from '../../components/popup';
import { useState } from 'react';
import room from '../../asset/images/room1.png';
import heart from '../../asset/images/heart.png';
import noHeart from '../../asset/images/RoomLike.png';
import mainten from '../../asset/images/house_detail_maintenance.png';
import floor from '../../asset/images/house_detail_floor.png';
import ele from '../../asset/images/house_detail_ele.png';
import parking from '../../asset/images/house_detail_parking.png';
import rightArrow from '../../asset/images/rightArrow.png';
export const HouseDetail = () => {
  const params = useParams();
  const { id } = params;
  const [userId] = useAtom(userIdAtom);
  const { deleteLikeMutation, postLikeMutation } = useHouseMutation();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };
  const houseDetailId = Number(id);

  const { data: house, isError: isHouseError, refetch } = useHouseDetailQuery(houseDetailId);

  const handleLike = (houseDetailId: number, liked?: boolean) => {
    if (!userId) {
      showAlert('로그인이 필요합니다!');
      return;
    }

    if (liked) {
      deleteLikeMutation.mutate(houseDetailId, {
        onSuccess: () => {
          // queryClient.invalidateQueries({ queryKey: ['house-detail', houseDetailId] });
          refetch();
        },
      });
    } else {
      postLikeMutation.mutate(houseDetailId, {
        onSuccess: () => {
          // queryClient.invalidateQueries({ queryKey: ['house-detail', houseDetailId] });
          refetch();
        },
      });
    }
  };

  if (isHouseError) {
    return <div className="p-4 text-center text-red-500">게시글을 불러오는 중 오류가 발생했습니다.</div>;
  }
  if (!house) {
    return <div className="p-4 text-center text-gray-500">해당 게시글이 존재하지 않습니다.</div>;
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full h-[50vh] relative overflow-hidden">
        <img src={room} alt="roomex" className="w-full h-full object-cover" />
        {/* 로그인 여부(userId) 체크 */}
        {userId ? (
          // ─────────── 로그인 상태일 때 ───────────
          <button onClick={() => handleLike(houseDetailId, house.liked)} className="absolute top-2 right-2 p-1">
            {house.liked ? (
              <img
                src={heart}
                alt="좋아요"
                className="w-12 h-12 bg-white bg-opacity-70 px-2 py-1 rounded text-sm font-bold shadow"
              />
            ) : (
              <img
                src={noHeart}
                alt="안좋아요"
                className="w-12 h-12 bg-white bg-opacity-70 px-2 py-1 rounded text-sm font-bold shadow"
              />
            )}
          </button>
        ) : (
          // ─────────── 로그아웃(또는 비로그인) 상태일 때 ───────────
          <img src={noHeart} alt="로그인 필요" className="absolute top-2 right-2 w-12 h-12" />
        )}
      </div>
      {/* 주소 및 관리비, 사이즈 */}
      <div className="w-full mt-6 px-4 text-center">
        <div className="flex justify-between items-center mb-2 text-xl text-gray-500 font-bold">
          <div className="flex-1 text-center">관리비 {house.management} 원</div>
          <div className="text-right w-40">{getTimeAgo(house.createdAt)}</div>
        </div>
        <div className="text-xl sm:text-2xl font-bold text-purple-500">{house.houseDetailAddress}</div>

        {/* 키워드 태그 */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {house.houseKeyword?.map((kw, idx) => (
            <span key={idx} className="text-sm sm:text-base text-blue-500 border border-blue-300 rounded px-3 py-1">
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-full h-3 mt-10 bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]"></div>

      {/* 설명 */}
      <div className="w-full mt-10 text-center px-4">
        <p className="text-sm sm:text-base">목동역 근처 채광 좋고 풀 옵션인 큰 원룸을 소개합니다.</p>
      </div>

      <div className="w-full h-1 mt-10 bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]"></div>

      {/* 주요 정보 */}
      <div className="w-full mt-10">
        <div className="flex justify-center gap-x-6 gap-y-8 text-sm text-gray-700">
          <div className="flex flex-col items-center gap-2 w-1/2 sm:w-auto">
            <img src={mainten} alt="면적" className="w-12 h-12 sm:w-14 sm:h-14" />
            <p className="text-center font-bold text-base sm:text-xl">전용 {house.maintenance} ㎡</p>
          </div>

          <div className="flex flex-col items-center gap-2 w-1/2 sm:w-auto">
            <img src={floor} alt="층수" className="w-12 h-12 sm:w-14 sm:h-14" />
            <p className="text-center font-bold text-base sm:text-xl">{house.floor} 층</p>
          </div>

          <div className="flex flex-col items-center gap-2 w-1/2 sm:w-auto">
            <img src={ele} alt="엘리베이터" className="w-12 h-12 sm:w-14 sm:h-14" />
            <p className="text-center font-bold text-base sm:text-xl">엘리베이터 {house.elevator}</p>
          </div>

          <div className="flex flex-col items-center gap-2 w-1/2 sm:w-auto">
            <img src={parking} alt="주차" className="w-12 h-12 sm:w-14 sm:h-14" />
            <p className="text-center font-bold text-base sm:text-xl">주차 {house.parking}</p>
          </div>

          <div className="flex flex-col items-center gap- w-1/2 sm:w-auto">
            <img src={rightArrow} alt="더보기" />
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-full h-3 mt-10 bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]"></div>

      {/* 실거주자 리뷰 */}
      <div className="w-full mt-10 text-center px-4">
        <h1 className="text-xl sm:text-2xl font-bold">실거주자 리뷰</h1>
      </div>

      {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
    </div>
  );
};
