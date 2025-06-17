import { useDeviceLayout } from '../../../hooks/useDeviceLayout';
import { useNavigate } from 'react-router-dom';
import { IHouseDetailDto } from '../../../types/dto/house';
import heart from '../../../asset/images/heart.png';
import no_heart from '../../../asset/images/no_heart.png';
import sun from '../../../asset/images/sun.png';
import space from '../../../asset/images/space.png';
import animal from '../../../asset/images/animal.png';
import what from '../../../asset/images/what.png';
import { useEffect, useState } from 'react';

interface HouseItemProps extends IHouseDetailDto {
  onHeartClick: () => void;
  isLiked: boolean;
}
export const HouseItem = ({
  houseDetailId,
  houseFilePath,
  maintenance,
  floor,
  management,
  propertyType,
  houseDetailAddress,
  houseKeyword,
  onHeartClick,
  isLiked,
}: HouseItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  const navigate = useNavigate();
  return (
    <div key={houseDetailId} className="border-b py-4 flex flex-col md:flex-row gap-4">
      {/* 이미지 영역 */}
      <div
        className="relative w-full md:w-1/3 cursor-pointer"
        onClick={() => navigate(`/house/detail/${houseDetailId}`)}>
        <img src={houseFilePath} alt="room" className="object-cover w-full h-40 md:h-44 rounded" />
        <div className="absolute top-2 right-2 bg-white bg-opacity-70 px-2 py-1 rounded text-sm font-bold shadow">
          <img
            src={heart}
            alt="찜"
            className="w-5 h-5"
            onClick={(e) => {
              e.stopPropagation();
              // onHeartClick(houseDetailId);
            }}
          />
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className="w-full md:w-2/3 flex flex-col justify-between">
        <div className="mb-2">
          <div className="text-sm text-gray-600 font-semibold">{propertyType}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {houseKeyword?.map((kw, idx) => (
              <span key={idx} className="text-xs sm:text-sm text-purple-500 font-bold">
                #{kw}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm font-bold text-gray-800">
            <p>{houseDetailAddress}</p>
            <span>|</span>
            <p>{maintenance}㎡</p>
            <span>|</span>
            <p>{floor}층</p>
            <span>|</span>
            <p>{management}</p>
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
            <span>{houseDetailAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
