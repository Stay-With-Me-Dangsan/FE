export interface IHouseMainDto {
  // 1. HouseMain 단건 조회 시 (GET /getMain?houseMainId=1)
  houseMainId: number;
}

export interface IHouseDetail {
  // 2. HouseDetail 단건 조회 시 (GET /getDetail?houseDetailId=1)
  houseDetailId: number;
}

export interface IHouseDetails {
  // 3. 지도 범위 내 모든 집 목록 조회 시 (GET /getDetails)
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

// 지도 마커 렌더링용
export interface IHouseDetailDto {
  latitude: number;
  longitude: number;
  count?: number;
  houseDetailId: number;
  houseFilePath: string;
  tags: string[];
  propertyType: string;
  houseDetailAddress: string;
  size: string;
  floor: number;
  maintenance: number;
  management: number;
  options: { icon: string; label: string }[];
  roomType: string;
}

// 4. 필터 조건으로 지도 집 목록 조회 시 (GET /getDetailsByCondition)
export interface IHouseFilterCondition {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  depositRange?: [number, number];
  monthlyRentRange?: [number, number];
  spaceTypes?: string[];
  genderTypes?: string[];
  contractPeriod?: {
    minYear: string;
    minMonth: string;
    maxYear: string;
    maxMonth: string;
  };
}
// POST /createMain
export interface ICreateHouseMain {
  houseMainId: number;
  houseAddress: string;
  houseZonecode: number;
  houseName: string;
}
// POST /createDetail
export interface ICreateHouseDetail {
  houseMainId: number;
  houseDetailAddress: string;
  houseDescription: string;
  houseKeyword: string[];
  houseFeatures: string[];
  housePhone: string;
  propertyType: string;
  houseDeposit: number;
  houseRent: number;
  shareStartDate: Date | null;
  shareEndDate: Date | null;
  coordinates: { x: number; y: number };
  createdBy: string;
}
// PATCH /updateDetail
export interface IPatchUpdateHouseDetail {
  houseDetailId: number;
  housePhone: string;
}
// DELETE /deleteDetail
export interface IDeleteHouseDetail {
  houseDetailId: number;
}
export interface ClusterWithHouses {
  lat: number;
  lng: number;
  count: number;
  houses: IHouseDetailDto[];
}
