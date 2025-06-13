import { useAtom } from 'jotai';
import { userIdAtom } from '../../../store/jwt';
import { useHouseMutation } from '../../../hooks/house/mutation/useHouseMutation';
import { IHouseDetailDto } from '../../../types/dto/house';
import heart from '../../../asset/images/heart.png';
import { Alert } from '../../../components/popup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import sun from '../../../asset/images/sun.png';
import space from '../../../asset/images/space.png';
import animal from '../../../asset/images/animal.png';
import what from '../../../asset/images/what.png';
import drag_list from '../../../asset/images/drag_list.png';

interface MapListProps {
  selectedClusterHouses: IHouseDetailDto[];
}

export const MapList = ({ selectedClusterHouses }: MapListProps) => {
  const navigate = useNavigate();
  const { deleteLikeMutation, postLikeMutation } = useHouseMutation();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const houses = selectedClusterHouses ?? [];
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };

  const [userId] = useAtom(userIdAtom);

  const handleLike = (houseDetailId: number, liked?: boolean) => {
    if (!userId) {
      showAlert('로그인이 필요합니다!');
      return;
    }

    if (liked) {
      deleteLikeMutation.mutate(houseDetailId, {
        // onSuccess: () => {
        // refetch();
        // },
      });
    } else {
      console.log('좋아요!', houseDetailId);
      postLikeMutation.mutate(houseDetailId, {
        // onSuccess: () => {
        //  refetch();
        // },
      });
    }
  };

  return (
    <div
      className={`absolute bottom-0 w-full bg-white ${isExpanded ? 'h-2/3' : 'h-1/3'} overflow-y-scroll z-50 p-4 shadow-md`}>
      <h2 className="flex justify-center items-center text-md font-bold mb-2 text-center gap-2">
        목록 {houses.length}건
        <span onClick={toggleExpand} className="cursor-pointer">
          <img src={drag_list} alt="목록 펼치기" className="w-5 h-5" />
        </span>
      </h2>

      {houses.map((house) => (
        <div key={house.houseDetailId} className="border-b py-4 flex flex-col md:flex-row gap-4">
          {/* 이미지 영역 */}
          <div
            className="relative w-full md:w-1/3 cursor-pointer"
            onClick={() => navigate(`/house/detail/${house.houseDetailId}`)}>
            <img src={house.houseFilePath} alt="room" className="object-cover w-full h-40 md:h-44 rounded" />
            <div className="absolute top-2 right-2 bg-white bg-opacity-70 px-2 py-1 rounded text-sm font-bold shadow">
              <img
                src={heart}
                alt="찜"
                className="w-5 h-5"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(house.houseDetailId);
                }}
              />
            </div>
          </div>

          {/* 텍스트 영역 */}
          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <div className="mb-2">
              <div className="text-sm text-gray-600 font-semibold">{house.propertyType}</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {house.houseKeyword?.map((kw, idx) => (
                  <span key={idx} className="text-xs sm:text-sm text-purple-500 font-bold">
                    #{kw}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-sm font-bold text-gray-800">
                <p>{house.houseDetailAddress}</p>
                <span>|</span>
                <p>{house.maintenance}㎡</p>
                <span>|</span>
                <p>{house.floor}층</p>
                <span>|</span>
                <p>{house.management}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-3 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <img src={animal} alt="반려동물 불가능" className="w-5 h-5" />
                <span>애완동물 불가능</span>
              </div>
              <div className="flex items-center gap-1">
                <img src={what} alt="즉시 입주" className="w-5 h-5" />
                <span>즉시 입주 가능</span>
              </div>
              <div className="flex items-center gap-1">
                <img src={sun} alt="동향" className="w-5 h-5" />
                <span>동향 (안방 기준)</span>
              </div>
              <div className="flex items-center gap-1">
                <img src={space} alt="위치" className="w-5 h-5" />
                <span>{house.houseDetailAddress}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
    </div>
  );
};
