export interface IHouseGetMain {
  houseAddress: string;
  houseMainId: number;
  houseName: string;
  houseZonecode: number;
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
