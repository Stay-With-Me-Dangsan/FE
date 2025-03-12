import { useDeviceLayout } from '../../../hooks/useDeviceLayout';
import { Input } from '../../../components/input';
import { useState } from 'react';
import { useHouseDetailsByConditionQuery } from '../../../hooks/house';

const filterList = ['보증금', '월세', '공간유형', '계약기간', '성별'];

export const MapSearch = () => {
  const { isMobile } = useDeviceLayout();

  const [selectedFilter, setSelectedFilter] = useState(() =>
    filterList.map((el, idx) => ({ id: idx, name: el, selected: false })),
  );
  const [text, setText] = useState<string>('');

  const houseDetailsByConditionQuery = useHouseDetailsByConditionQuery();

  return (
    <div className={`${isMobile ? 'h-28' : 'h-32'} flex flex-col justify-center gap-2`}>
      <Input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        color="purple"
        placeholder="주소 검색으로 쉐어하우스를 알아봐요!"
      />

      <div className="flex items-center gap-4">
        {selectedFilter.map((el) => (
          <button
            key={el.id}
            className={`${el.selected ? 'bg-[#9470DC] text-white' : 'bg-[#F0F0F0] text-black'} ${isMobile ? 'px-[6px] py-[4px]' : 'px-[8px] py-[10px]'} rounded-[8px] whitespace-nowrap`}
            onClick={() => {
              setSelectedFilter((prev) =>
                prev.map((filter) => (filter.id === el.id ? { ...filter, selected: !filter.selected } : filter)),
              );
            }}>
            {el.name}
          </button>
        ))}
      </div>
    </div>
  );
};
