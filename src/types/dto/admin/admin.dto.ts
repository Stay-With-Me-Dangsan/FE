export interface CommonCode {
  id: number;
  group: string;
  name: string;
  codeKey: string;
  description: string;
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
