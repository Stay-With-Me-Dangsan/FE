import { useState } from 'react';
import { useDeviceLayout } from '../../../hooks/useDeviceLayout';

const filterList = ['보증금', '월세', '공간유형', '계약기간', '성별'];

export const MapSearchFilter = () => {
  const { width } = useDeviceLayout();

  const [selectedFilter, setSelectedFilter] = useState(() =>
    filterList.map((el, idx) => ({ id: idx, name: el, selected: false })),
  );

  return (
    <div className="h-1/2 flex items-center gap-4">
      {selectedFilter.map((el) => (
        <button
          key={el.id}
          className={`${el.selected ? 'bg-[#9470DC] text-white' : 'bg-[#F0F0F0] text-black'} ${width < 768 ? 'px-[6px] py-[4px]' : 'px-[8px] py-[10px]'} rounded-[8px] whitespace-nowrap`}
          onClick={() => {
            setSelectedFilter((prev) =>
              prev.map((filter) => (filter.id === el.id ? { ...filter, selected: !filter.selected } : filter)),
            );
          }}>
          {el.name}
        </button>
      ))}
    </div>
  );
};
