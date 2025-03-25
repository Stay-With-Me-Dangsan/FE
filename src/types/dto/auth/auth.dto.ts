export interface ISignInDto {
  email: string;
  password: string;
}

export interface ISignUpDto {
  email: string;
  password: string;
  confirmPassword: string;
  birth: string;
  nickname: string;
  gender: string;
}

export interface IOauthRegDto {
  userId: number;
  nickname: string;
  gender: string;
  birth: string;
}

export interface IEmailCodeDto {
  email: string;
  verificationCode: string;
}

export interface IPatchUpdateNicknameDto {
  userId: number;
  nickname: string;
}

export interface IPatchEmailDto {
  userId: number;
  email: string;
}

export interface IPatchPwDto {
  userId: number;
  password: string;
}

export interface IfindEmailDto {
  nickname: string;
  birth: string;
}
