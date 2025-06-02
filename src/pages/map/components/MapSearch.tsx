import { useState } from 'react';
import { IHouseFilterCondition } from '../../../types/dto/house';
import MapAddressSearch from './MapAddressSearch';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useDeviceLayout } from '../../../hooks/useDeviceLayout';

const filterList = ['보증금', '월세', '공간유형', '입주날짜', '성별'];
//const depositMarks = ['최소', '2천만원', '5천만원', '1억', '최대'];
// const monthlyRentMarks = ['최소', '20만원', '50만원', '100만원', '최대'];
const DEPOSIT_Min = 0;
const DEPOSIT_MAX = 500000000; //5억
const depositMarks = {
  [DEPOSIT_Min]: '최소',
  [(DEPOSIT_MAX * 1) / 5]: '1천만원',
  [(DEPOSIT_MAX * 2) / 5]: '5천만원',
  [(DEPOSIT_MAX * 3) / 5]: '1억원',
  [DEPOSIT_MAX]: '최대',
};
const MONTHLY_Min = 0;
const MONTHLY_MAX = 5000000; //500만원

const monthlyRentMarks = {
  [MONTHLY_Min]: '최소',
  [(MONTHLY_MAX * 1) / 5]: '20만원',
  [(MONTHLY_MAX * 2) / 5]: '50만원',
  [(MONTHLY_MAX * 3) / 5]: '100만원',
  [MONTHLY_MAX]: '최대',
};
const spaceTypes = ['원룸', '투룸', '오피스텔', '아파트', '빌라', '타운하우스'];
const genderTypes = ['남성', '여성', '기타'];

export const MapSearch = ({
  setLatitude,
  setLongitude,
  mapRef,
  filterCondition,
  setFilterCondition,
}: {
  setLatitude: (lat: number) => void;
  setLongitude: (lng: number) => void;
  mapRef: React.MutableRefObject<kakao.maps.Map | null>;
  filterCondition: IHouseFilterCondition;
  setFilterCondition: (value: IHouseFilterCondition) => void;
}) => {
  const { isMobile } = useDeviceLayout();

  const [selectedFilter, setSelectedFilter] = useState(() =>
    filterList.map((el, idx) => ({ id: idx, name: el, selected: false, displayValue: '' })),
  );

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const updateDisplayValue = (filterName: string, value: string, updateCondition?: Partial<IHouseFilterCondition>) => {
    setSelectedFilter((prev) =>
      prev.map((f) => (f.name === filterName ? { ...f, selected: true, displayValue: value } : f)),
    );

    if (updateCondition) {
      const updatedCondition: IHouseFilterCondition = {
        ...filterCondition, // 다른 필드도 유지
        ...updateCondition, // 덮어쓰기
      };

      setFilterCondition(updatedCondition);
    }
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
              setActiveFilter((prev) => (prev === el.name ? null : el.name));
            }}>
            {el.selected && el.displayValue ? `${el.name} - ${el.displayValue}` : el.name}
          </button>
        ))}
      </div>

      {/* 보증금 */}
      {activeFilter === '보증금' && (
        <Slider
          range
          min={0}
          max={500000000} // 10억
          step={5000000} // 500만원 단위 조절
          marks={depositMarks}
          value={filterCondition.depositRange}
          onChange={(range) => {
            const [start, end] = range as [number, number];
            updateDisplayValue(
              '보증금',
              `${(start / 10000).toLocaleString()}만원 ~ ${(end / 10000).toLocaleString()}만원`,
              {
                monthlyRentRange: [start, end],
              },
            );
          }}
        />
      )}

      {/* 월세 */}
      {activeFilter === '월세' && (
        <Slider
          range
          min={0}
          max={5000000}
          // step={10000} // 1만원 단위
          marks={monthlyRentMarks}
          value={filterCondition.monthlyRentRange}
          onChange={(range) => {
            const [start, end] = range as [number, number];
            updateDisplayValue('월세', `${start.toLocaleString()}원 ~ ${end.toLocaleString()}원`, {
              monthlyRentRange: [start, end],
            });
          }}
        />
      )}

      {/* 공간유형 */}
      {activeFilter === '공간유형' && (
        <div className="flex flex-wrap gap-2 mt-2">
          {spaceTypes.map((type) => {
            const selected = filterCondition.spaceType?.includes(type);
            return (
              <button
                key={type}
                onClick={() => {
                  const newTypes = (filterCondition.spaceType ?? []).includes(type)
                    ? (filterCondition.spaceType ?? []).filter((t) => t !== type)
                    : [...(filterCondition.spaceType ?? []), type];
                  updateDisplayValue('공간유형', newTypes.join(', '), { spaceType: newTypes });
                }}
                className={`px-3 py-1 rounded ${selected ? 'bg-purple-500 text-white' : 'bg-gray-200 text-black'}`}>
                {type}
              </button>
            );
          })}
        </div>
      )}

      {activeFilter === '입주날짜' && (
        <div className="flex items-center gap-4 mt-4 text-sm text-black">
          <label className="font-medium">
            입주 시작일
            <input
              type="date"
              value={filterCondition.shareStartDate || ''}
              onChange={(e) =>
                updateDisplayValue('입주날짜', `시작일 ${e.target.value}`, {
                  shareStartDate: e.target.value,
                })
              }
              className="ml-2 px-2 py-1 border-2 border-purple-300 rounded-md text-sm"
            />
          </label>

          <label className="font-medium">
            입주 종료일
            <input
              type="date"
              value={filterCondition.shareEndDate || ''}
              onChange={(e) =>
                updateDisplayValue('입주날짜', `종료일 ${e.target.value}`, {
                  shareEndDate: e.target.value,
                })
              }
              className="ml-2 px-2 py-1 border-2 border-purple-300 rounded-md text-sm"
            />
          </label>
        </div>
      )}

      {/* {activeFilter === '계약기간' && (
        <div className="flex items-center gap-2 mt-4 text-sm text-black">
          <span className="font-medium">최소</span>
          <input
            type="number"
            value={filterCondition.contractPeriod?.minYear || ''}
            placeholder="년"
            className="w-14 px-2 py-1 border-2 border-purple-300 rounded-md text-center"
            onChange={(e) => {
              const val = e.target.value;
              updateDisplayValue('계약기간', `${val}년`, {
                contractPeriod: {
                  ...filterCondition.contractPeriod,
                  minYear: val,
                },
              });
            }}
          />
          <span className="ml-[-6px]">년</span>
          <input
            type="number"
            value={filterCondition.contractPeriod?.minMonth || ''}
            placeholder="개월"
            className="w-14 px-2 py-1 border-2 border-purple-300 rounded-md text-center"
            onChange={(e) => {
              const val = e.target.value;
              updateDisplayValue('계약기간', ``, {
                contractPeriod: {
                  ...filterCondition.contractPeriod,
                  minMonth: val,
                },
              });
            }}
          />
          <span className="ml-[-6px]">개월</span>

          <span className="mx-2">–</span>

          <span className="font-medium">최대</span>
          <input
            type="number"
            value={filterCondition.contractPeriod?.maxYear || ''}
            placeholder="년"
            className="w-14 px-2 py-1 border-2 border-purple-300 rounded-md text-center"
            onChange={(e) => {
              const val = e.target.value;
              updateDisplayValue('계약기간', `${filterCondition.contractPeriod?.minYear || ''}년 ~ ${val}년`, {
                contractPeriod: {
                  ...filterCondition.contractPeriod,
                  maxYear: val,
                },
              });
            }}
          />
          <span className="ml-[-6px]">년</span>
          <input
            type="number"
            value={filterCondition.contractPeriod?.maxMonth || ''}
            placeholder="개월"
            className="w-14 px-2 py-1 border-2 border-purple-300 rounded-md text-center"
            onChange={(e) => {
              const val = e.target.value;
              updateDisplayValue('계약기간', ``, {
                contractPeriod: {
                  ...filterCondition.contractPeriod,
                  maxMonth: val,
                },
              });
            }}
          />
          <span className="ml-[-6px]">개월</span>
        </div>
      )} */}

      {/* 계약기간 */}
      {/* {activeFilter === '계약기간' && (
        <div className="flex gap-2 items-center text-sm mt-2">
          <input
            type="number"
            value={filterCondition.contractPeriod?.minYear || ''}
            placeholder="최소 년"
            className="border w-16 px-1"
            onChange={(e) => {
              const val = e.target.value;
              updateDisplayValue('계약기간', `${val}년`, {
                contractPeriod: {
                  ...filterCondition.contractPeriod,
                  minYear: val,
                },
              });
            }}
          />
          ~
          <input
            type="number"
            value={filterCondition.contractPeriod?.maxYear || ''}
            placeholder="최대 년"
            className="border w-16 px-1"
            onChange={(e) => {
              const val = e.target.value;
              updateDisplayValue('계약기간', `${filterCondition.contractPeriod?.minYear}년 ~ ${val}년`, {
                contractPeriod: {
                  ...filterCondition.contractPeriod,
                  maxYear: val,
                },
              });
            }}
          />
        </div>
      )} */}

      {/* 성별 */}
      {activeFilter === '성별' && (
        <div className="flex gap-2 mt-2">
          {genderTypes.map((type) => {
            const selected = filterCondition.genderType?.includes(type);
            return (
              <button
                key={type}
                onClick={() => {
                  const newType = selected ? '' : type; // 같은 걸 누르면 해제
                  updateDisplayValue('성별', newType, { genderType: newType });
                }}
                className={`px-3 py-1 rounded ${selected ? 'bg-purple-500 text-white' : 'bg-gray-200 text-black'}`}>
                {type}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
