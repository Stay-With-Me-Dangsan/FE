import { AxiosConfig } from '../../common/axios-config';
import { ISignInRes, ISignUpRes, IfindEmailRes } from '../../types/res/auth';
import { ISignInDto, ISignUpDto, IOauthRegDto, IfindEmailDto } from '../../types/dto/auth';

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

  async PatchOauthReg(dto: IOauthRegDto) {
    return await this.patch({
      url: `${this._baseURL}/oauthReg`,
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
}

export default new AuthApi();
