export interface SignInRequestDto {
  email: string;
  password: string;
}

export interface ISignUpReq {
  email: string;
  password: string;
  confirmPassword: string;
  birth: string;
  nickname: string;
  gender: string;
}

export interface IEmailCodeReq {
  email: string;
  verificationCode: string;
}
