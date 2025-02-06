import { useState } from 'react';

const filterList = ['보증금', '월세', '공간유형', '계약기간', '성별'];

export const SearchFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState(() =>
    filterList.map((el, idx) => ({ id: idx, name: el, selected: false })),
  );

  return (
    <div className="h-1/2 flex items-center gap-4    ">
      {selectedFilter.map((el) => (
        <button
          key={el.id}
          className={`${el.selected ? 'bg-[#9470DC] text-white' : 'bg-[#F0F0F0] text-black'} px-[8px] py-[10px] rounded-[8px] `}
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
