import { IHouseDetailDto } from '../../dto/house';

export interface IHouseMainRes {
  houseMainId: number;
  houseAddress: string;
  houseName: string;
  houseZonecode: number;
}

export interface ClusterWithHouses {
  lat: number;
  lng: number;
  count: number;
  houses: IHouseDetailDto[];
}
