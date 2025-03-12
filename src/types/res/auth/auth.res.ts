import { IGetUser } from '../../interface/auth';

export interface ISignInRes {
  user: {
    accessToken: string;
    refreshToken: string;
    userId: number;
    nickname: string;
    email: string;
  };
}

export interface ISignUpRes {
  userId: number;
  email: string;
  nickname: string;
}

export interface IgetMypageRes {
  user: {
    nickname: string;
    email: string;
    password: string;
  };
}
export interface IUpdateNicknameRes {
  success: boolean;
  message: string;
  user: {
    id: number;
    nickname: string;
    email: string;
  };
}

export interface IUpdateEmailRes {
  success: boolean;
  message: string;
  user: {
    id: number;
    email: string;
  };
}

export interface IUpdatePwRes {
  success: boolean;
  message: string;
  user: {
    id: number;
    password: string;
  };
}
export interface IfindEmailRes {
  success: boolean;
  message: string;
  user: {
    email: string;
    createdDate: Date;
  };
}

export interface IfindPasswordRes {
  success: boolean;
  message: string;
  user: {
    id: number;
    nickname: string;
    email: string;
  };
}
