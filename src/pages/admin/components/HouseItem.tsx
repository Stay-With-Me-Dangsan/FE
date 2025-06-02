import { useDeviceLayout } from '../../../hooks/useDeviceLayout';
import { IHouse } from '../../../types/interface/house/house.model';
import sun from '../../../asset/images/sun.png';
import space from '../../../asset/images/space.png';
import animal from '../../../asset/images/animal.png';
import what from '../../../asset/images/what.png';
interface HouseItemProps {
  house: IHouse;
}

export const HouseItem = ({ house }: HouseItemProps) => {
  return (
    <div className="w-full flex flex-col items-center overflow-y-auto py-6">
      <div className="w-full h-[222px] border-b-[1px] border-[#CDCDCD]">
        <div className="w-full h-[164px] flex">
          <div className="mr-5 relative w-[164px] h-[164px]">
            <img src={house.imageSrc} alt="room" width={164} className="object-cover" />
            <div className="absolute top-2 right-2 bg-white bg-opacity-70 px-2 py-1 rounded text-sm font-bold shadow">
              {house.type}
            </div>
          </div>
          <div className="inline-grid">
            <div className="text-sm text-purple-500 font-bold mb-1">
              #{house.tags?.[0]} #{house.tags?.[1]}
            </div>
            <div className="flex gap-5">
              <p className="font-bold">{house.address}</p>
              <p>|</p>
              <p className="font-bold">{house.size}</p>
              <p>|</p>
              <p className="font-bold">{house.floor}</p>
              <p>|</p>
              <p className="font-bold">{house.maintenance}</p>
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
                <span>{house.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
