export interface SignInResponseDto {
  access_token: string;
  refresh_token: string;
}

export interface ISignUpRes {
  id: Number;
  email: string;
  nickname: string;
}
