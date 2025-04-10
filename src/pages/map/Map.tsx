import { MapList, Maps, MapSearch } from './components';
import { useState, useRef } from 'react';

export const Map = () => {
  const [latitude, setLatitude] = useState<number>(37.55586671127581); //위도
  const [longitude, setLongitude] = useState<number>(126.97207997617642); //경도
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const mapRef = useRef<kakao.maps.Map>(null);
  const [depositRange, setDepositRange] = useState<[number, number]>([0, 4]);
  const [monthlyRentRange, setMonthlyRentRange] = useState<[number, number]>([0, 4]);
  const [selectedSpaceTypes, setSelectedSpaceTypes] = useState<string[]>([]);
  const [contractPeriod, setContractPeriod] = useState({
    minYear: '',
    minMonth: '',
    maxYear: '',
    maxMonth: '',
  });
  const [selectedGenderTypes, setSelectedGenderTypes] = useState<string[]>([]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <MapSearch
        depositRange={depositRange}
        setDepositRange={setDepositRange}
        monthlyRentRange={monthlyRentRange}
        setMonthlyRentRange={setMonthlyRentRange}
        selectedSpaceTypes={selectedSpaceTypes}
        setSelectedSpaceTypes={setSelectedSpaceTypes}
        contractPeriod={contractPeriod}
        setContractPeriod={setContractPeriod}
        selectedGenderTypes={selectedGenderTypes}
        setSelectedGenderTypes={setSelectedGenderTypes}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        mapRef={mapRef}
      />
      <div className="flex-1 overflow-hidden">
        <Maps
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
          setIsOpened={setIsOpened}
          filters={{
            depositRange,
            monthlyRentRange,
            selectedSpaceTypes,
            contractPeriod,
            selectedGenderTypes,
          }}
        />
      </div>
      {isOpened && <MapList />}
    </div>
  );
};
