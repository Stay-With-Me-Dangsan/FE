export interface IHouseMainRes {
  houseMainId: number;
  houseAddress: string;
  houseName: string;
  houseZonecode: number;
}
export interface IHouseDetailRes {
  houseDetailId: number;
  houseMainId: number;
  houseDetailAddress: string;
  houseDescription: string;
  housePhone: string;
  houseDeposit: number;
  houseRent: number;
  // 기타 응답 필드
}
