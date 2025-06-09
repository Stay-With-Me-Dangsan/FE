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
        //  refetch();
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
        <div key={house.houseDetailId} className="border-b py-2 flex gap-4">
          <div className="w-full flex" onClick={() => navigate(`/house/detail/${house.houseDetailId}`)}>
            <div className="mr-5 relative w-22">
              <img src={house.houseFilePath} alt="room" width={164} className="object-cover" />
              <div className="absolute top-2 right-2 bg-white bg-opacity-70 px-2 py-1 rounded text-sm font-bold shadow">
                <img src={heart} alt="room" onClick={() => handleLike(house.houseDetailId)} className="object-cover" />
              </div>
            </div>
            <div className="inline-grid">
              <div className="text-sm text-500 font-bold mb-1">{house.propertyType}</div>

              {house.houseKeyword?.map((kw, idx) => (
                <span key={idx} className="text-sm text-purple-500 font-bold mb-1">
                  #{kw}
                </span>
              ))}

              <div className="flex gap-5">
                <p className="font-bold">{house.houseDetailAddress}</p>
                <p>|</p>
                <p className="font-bold">{house.maintenance}㎡</p>
                <p>|</p>
                <p className="font-bold">{house.floor}층</p>
                <p>|</p>
                <p className="font-bold">{house.management}</p>
              </div>

              <div className="flex gap-6 mt-4 text-sm text-gray-600">
                {/* 반려동물 불가 */}
                <div className="flex items-center gap-1">
                  <img src={animal} alt="반려동물 불가능" className="w-5 h-5" />
                  <span>애완동물 불가능</span>
                </div>

                {/* 즉시 입주 */}
                <div className="flex items-center gap-1">
                  <img src={what} alt="즉시 입주 가능" className="w-5 h-5" />
                  <span>즉시 입주 가능</span>
                </div>

                {/* 동향 */}
                <div className="flex items-center gap-1">
                  <img src={sun} alt="동향" className="w-5 h-5" />
                  <span>동향 (안방 주실 기준)</span>
                </div>

                {/* 주소 */}
                <div className="flex items-center gap-1">
                  <img src={space} alt="위치" className="w-5 h-5" />
                  <span>{house.houseDetailAddress}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
    </div>
  );
};
