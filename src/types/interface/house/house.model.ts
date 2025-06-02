import { IHouseDetailDto } from '../../dto/house';

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

export interface ClusterWithHouses {
  lat: number;
  lng: number;
  count: number;
  houses: IHouseDetailDto[];
}
