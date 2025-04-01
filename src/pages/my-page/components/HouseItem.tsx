import { useDeviceLayout } from '../../../hooks/useDeviceLayout';
import { IHouse } from '../../../types/interface/house/house.model';

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
            <div className="flex gap-3">
              <p className="text-2xl text-purple-300 font-bold">{house.tags.join(' ')}</p>
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
            <div className="flex flex-wrap gap-x-4 gap-y-2 max-w-[824px]">
              {house.options.map((opt: any, idx: any) => (
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
