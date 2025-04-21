export interface CommonCode {
  commonCodeId: number;
  commonCodeGroupId: string;
  commonCodeName: string;
  commonCodeKey: string;
  commonCodeDescription: string;
}

export interface IGetCodeDto {
  groupId: string;
  codeKey: string;
}

export interface ICreateCodeDto {
  groupId: string;
  codeKey: string;
  name: string;
  descript: string;
}

export interface IPatchCodeDto {
  groupId: string;
  codeKey: string;
  name: string;
  descript: string;
}

export interface IdeleteCodeDto {
  commonCodeId: number;
}

export interface UsersDto {
  user_id: number;
  email: string;
  nickname: string;
  birth: string;
  gender: string;
  createdDate: Date;
  provider: string;
}
