import { AxiosConfig } from '../../common/axios-config';
import {
  ISignInRes,
  ISignUpRes,
  IUpdateNicknameRes,
  IUpdateEmailRes,
  IUpdatePwRes,
  IfindEmailRes,
  IgetMypageRes,
} from '../../types/res/auth';
import {
  ISignInDto,
  ISignUpDto,
  IPatchUpdateNicknameDto,
  IPatchEmailDto,
  IPatchPwDto,
  IfindEmailDto,
  IEmailCodeDto,
} from '../../types/dto/auth';
import { promises } from 'dns';

class AuthApi extends AxiosConfig {
  private readonly _baseURL = '/user';

  async postSignIn(dto: ISignInDto) {
    return await this.post<ISignInRes, ISignInDto>({
      url: `${this._baseURL}/signIn`,
      data: dto,
    });
  }

  async postSignUp(dto: ISignUpDto) {
    return await this.post<ISignUpRes, ISignUpDto>({
      url: `${this._baseURL}/signUp`,
      data: dto,
    });
  }

  async postSendEmail(email: string) {
    return await this.post({
      url: `${this._baseURL}/emailCodeSend`,
      data: { email },
    });
  }

  async verifyCode(email: string, code: string) {
    return await this.post({
      url: `${this._baseURL}/emailCodeVerify`,
      data: { email, code },
    });
  }

  async postFindEmail(dto: IfindEmailDto) {
    return await this.post<IfindEmailRes, IfindEmailDto>({
      url: `${this._baseURL}/findEmail`,
      data: dto,
    });
  }

  async postFindPw(email: string) {
    return await this.post({
      url: `${this._baseURL}/findPw`,
      data: { email },
    });
  }

  async getMyPage(userId: number) {
    return await this.get<IgetMypageRes, { userId: number }>({
      url: `${this._baseURL}/mypage/${userId}`,
      params: { userId },
    });
  }

  async patchUpdateNickname(dto: IPatchUpdateNicknameDto) {
    return await this.patch<IUpdateNicknameRes, IPatchUpdateNicknameDto>({
      url: `${this._baseURL}/updateNickname`,
      data: dto,
    });
  }

  async patchUpdateEmail(dto: IPatchEmailDto) {
    return await this.patch<IUpdateEmailRes, IPatchEmailDto>({
      url: `${this._baseURL}/updateEmail`,
      data: dto,
    });
  }
  async patchUpdatePw(dto: IPatchPwDto) {
    return await this.patch<IUpdatePwRes, IPatchPwDto>({
      url: `${this._baseURL}/updatePw`,
      data: dto,
    });
  }

  async postLogOut() {
    return await this.post({
      url: `${this._baseURL}/logout`,
      data: null,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // ✅ JWT 추가
        'Content-Type': 'application/json',
      },
    });
  }
}

export default new AuthApi();
