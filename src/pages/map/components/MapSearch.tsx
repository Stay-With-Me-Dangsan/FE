import { useDeviceLayout } from '../../../hooks/useDeviceLayout';
import { Input } from '../../../components/input';
import { useState } from 'react';
import { MapSearchProps } from '../../../types/interface/house';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import MapAddressSearch from './MapAddressSearch';

const filterList = ['보증금', '월세', '공간유형', '계약기간', '성별'];

const depositMarks = ['최소', '2천만원', '5천만원', '1억', '최대'];
const monthlyRentMarks = ['최소', '20만원', '50만원', '100만원', '최대'];
const spaceTypes = ['원룸', '투룸', '오피스텔', '아파트', '빌라', '타운하우스'];
const genderTypes = ['남성', '여성', '기타'];

export const MapSearch = ({
  depositRange,
  setDepositRange,
  monthlyRentRange,
  setMonthlyRentRange,
  selectedSpaceTypes,
  setSelectedSpaceTypes,
  contractPeriod,
  setContractPeriod,
  selectedGenderTypes,
  setSelectedGenderTypes,
  setLatitude,
  setLongitude,
  mapRef,
}: MapSearchProps) => {
  const { isMobile } = useDeviceLayout();
  const [text, setText] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState(() =>
    filterList.map((el, idx) => ({ id: idx, name: el, selected: false, displayValue: '' })),
  );

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const updateDisplayValue = (filterName: string, value: string) => {
    setSelectedFilter((prev) =>
      prev.map((f) => (f.name === filterName ? { ...f, selected: true, displayValue: value } : f)),
    );
  };

  return (
    <div className={`flex flex-col gap-2 ${isMobile ? 'py-6' : 'py-10'} px-4 bg-white`}>
      <MapAddressSearch setLatitude={setLatitude} setLongitude={setLongitude} mapRef={mapRef} />
      <div className="flex items-center gap-4 mt-4">
        {selectedFilter.map((el) => (
          <button
            key={el.id}
            className={`${el.selected ? 'bg-[#9470DC] text-white' : 'bg-[#F0F0F0] text-black'} ${
              isMobile ? 'px-[6px] py-[4px]' : 'px-[8px] py-[10px]'
            } rounded-[8px] whitespace-nowrap`}
            onClick={() => {
              setSelectedFilter((prev) =>
                prev.map((filter) => (filter.id === el.id ? { ...filter, selected: true } : filter)),
              );
              setActiveFilter((prev) => (prev === el.name ? null : el.name)); // toggle
            }}>
            {el.selected && el.displayValue ? `${el.name} - ${el.displayValue}` : el.name}
          </button>
        ))}
      </div>

      {/* 보증금 슬라이더 */}
      {activeFilter === '보증금' && (
        <div className="mt-4 px-4 w-full">
          <Slider
            range
            min={0}
            max={4}
            step={1}
            marks={depositMarks.reduce((acc, val, idx) => ({ ...acc, [idx]: val }), {})}
            value={depositRange}
            onChange={(range) => {
              const [start, end] = range as [number, number];
              setDepositRange([start, end]);
              updateDisplayValue('보증금', `${depositMarks[start]} ~ ${depositMarks[end]}`);
            }}
            trackStyle={{ backgroundColor: '#9470DC' }}
            handleStyle={[
              { borderColor: '#9470DC', backgroundColor: '#fff' },
              { borderColor: '#9470DC', backgroundColor: '#fff' },
            ]}
          />
        </div>
      )}

      {/* 월세 슬라이더 */}
      {activeFilter === '월세' && (
        <div className="mt-4 px-4 w-full">
          <Slider
            range
            min={0}
            max={4}
            step={1}
            marks={monthlyRentMarks.reduce((acc, val, idx) => ({ ...acc, [idx]: val }), {})}
            value={monthlyRentRange}
            onChange={(range) => {
              const [start, end] = range as [number, number];
              setMonthlyRentRange([start, end]);
              updateDisplayValue('월세', `${monthlyRentMarks[start]} ~ ${monthlyRentMarks[end]}`);
            }}
            trackStyle={{ backgroundColor: '#9470DC' }}
            handleStyle={[
              { borderColor: '#9470DC', backgroundColor: '#fff' },
              { borderColor: '#9470DC', backgroundColor: '#fff' },
            ]}
          />
        </div>
      )}

      {/* 공간유형 선택 */}
      {activeFilter === '공간유형' && (
        <div className="flex gap-2 mt-4">
          {spaceTypes.map((type) => (
            <button
              key={type}
              className={`border px-3 py-1 rounded ${
                selectedSpaceTypes.includes(type) ? 'bg-purple-300 text-white' : 'bg-gray-100 text-black'
              }`}
              onClick={() => {
                setSelectedSpaceTypes((prev) => {
                  const newTypes = prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type];
                  updateDisplayValue('공간유형', newTypes.join(', '));
                  return newTypes;
                });
              }}>
              {type}
            </button>
          ))}
        </div>
      )}

      {/* 계약기간 선택 */}
      {activeFilter === '계약기간' && (
        <div className="flex gap-2 mt-4 items-center text-sm">
          최소
          <input
            type="number"
            placeholder="년"
            value={contractPeriod.minYear}
            className="border px-1 rounded w-12"
            onChange={(e) => {
              setContractPeriod({ ...contractPeriod, minYear: e.target.value });
              updateDisplayValue('계약기간', `${e.target.value}년 ~ ${contractPeriod.maxYear}년`);
            }}
          />
          년
          <input
            type="number"
            placeholder="개월"
            value={contractPeriod.minMonth}
            className="border px-1 rounded w-12"
            onChange={(e) => setContractPeriod({ ...contractPeriod, minMonth: e.target.value })}
          />
          개월 ~ 최대
          <input
            type="number"
            placeholder="년"
            value={contractPeriod.maxYear}
            className="border px-1 rounded w-12"
            onChange={(e) => {
              setContractPeriod({ ...contractPeriod, maxYear: e.target.value });
              updateDisplayValue('계약기간', `${contractPeriod.minYear}년 ~ ${e.target.value}년`);
            }}
          />
          년
          <input
            type="number"
            placeholder="개월"
            value={contractPeriod.maxMonth}
            className="border px-1 rounded w-12"
            onChange={(e) => setContractPeriod({ ...contractPeriod, maxMonth: e.target.value })}
          />
          개월
        </div>
      )}

      {/* 성별 선택 */}
      {activeFilter === '성별' && (
        <div className="flex gap-2 mt-4">
          {genderTypes.map((type) => (
            <button
              key={type}
              className={`border px-3 py-1 rounded ${
                selectedGenderTypes.includes(type) ? 'bg-purple-300 text-white' : 'bg-gray-100 text-black'
              }`}
              onClick={() => {
                setSelectedGenderTypes((prev) => {
                  const newTypes = prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type];
                  updateDisplayValue('성별', newTypes.join(', '));
                  return newTypes;
                });
              }}>
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
