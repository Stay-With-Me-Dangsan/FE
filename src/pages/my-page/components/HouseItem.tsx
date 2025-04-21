import { useDeviceLayout } from '../../../hooks/useDeviceLayout';
import { IHouseDetailDto } from '../../../types/dto/house';

export const HouseItem = (house: IHouseDetailDto) => {
  return (
    <div className="w-full flex flex-col items-center overflow-y-auto py-6">
      <div className="w-full h-[222px] border-b-[1px] border-[#CDCDCD]">
        <div className="w-full h-[164px] flex">
          <div className="mr-5 relative w-[164px] h-[164px]">
            <img src={house.houseFilePath} alt="room" width={164} className="object-cover" />
            <div className="absolute top-2 right-2 bg-white bg-opacity-70 px-2 py-1 rounded text-sm font-bold shadow">
              {house.roomType}
            </div>
          </div>
          <div className="inline-grid">
            <div className="text-sm text-purple-500 font-bold mb-1">
              #{house.tags?.[0]} #{house.tags?.[1]}
            </div>
            <div className="flex gap-5">
              <p className="font-bold">{house.houseDetailAddress}</p>
              <p>|</p>
              <p className="font-bold">{house.maintenance}㎡</p>
              <p>|</p>
              <p className="font-bold">{house.floor}층</p>
              <p>|</p>
              <p className="font-bold">{house.management}</p>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 max-w-[824px]">
              {house.options?.map((opt: any, idx: any) => (
                <div className="flex items-center gap-1 " key={idx}>
                  <img src={opt.icon} alt={opt.label} />
                  <p>{opt.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
