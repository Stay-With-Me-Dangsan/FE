export interface IHouseMainDto {
  houseMainId: number;
}

export interface IHouseDetail {
  houseDetailId: number;
}

export interface IHouseDetails {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface ICreateHouseMain {
  houseMainId: number;
  houseAddress: string;
  houseZonecode: number;
  houseName: string;
}

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

export interface IPatchUpdateHouseDetail {
  houseDetailId: number;
  housePhone: string;
}

export interface IDeleteHouseDetail {
  houseDetailId: number;
}
