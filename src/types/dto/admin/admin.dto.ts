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

export interface IBoardListRes {
  id?: number;
  boardType?: string;
  title?: string;
  content?: string;
  postId: number;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;
  views?: number;
  commentCount: number;
  likeCount: number;
  marked: boolean;
  thumbnail: string;
}

export interface IBoardDetailtRes {
  id?: number;
  boardType?: string;
  title?: string;
  content?: string;
  postId: number;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  marked: boolean;
  nickname: string;
}
