// 검색 필터 상태
export interface MapSearchProps {
  depositRange: [number, number];
  setDepositRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  monthlyRentRange: [number, number];
  setMonthlyRentRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  selectedSpaceTypes: string[];
  setSelectedSpaceTypes: React.Dispatch<React.SetStateAction<string[]>>;
  contractPeriod: {
    minYear: string;
    minMonth: string;
    maxYear: string;
    maxMonth: string;
  };
  setContractPeriod: React.Dispatch<
    React.SetStateAction<{
      minYear: string;
      minMonth: string;
      maxYear: string;
      maxMonth: string;
    }>
  >;
  selectedGenderTypes: string[];
  setSelectedGenderTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
  mapRef: React.RefObject<kakao.maps.Map>;
}

export interface IHouse {
  id: number;
  imageSrc: string;
  tags: string[];
  type: string;
  address: string;
  size: string;
  floor: string;
  maintenance: string;
  options: { icon: string; label: string }[];
}
