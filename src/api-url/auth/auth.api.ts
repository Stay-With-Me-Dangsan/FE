import { AxiosConfig } from '../../common/axios-config';
import { ISignInReq } from '../../types/interface/auth/req';
import { ISignInRes } from '../../types/interface/auth/res';

class AuthApi extends AxiosConfig {
  private readonly _baseURL = '/auth';

  async postSignIn(dto: ISignInReq) {
    return await this.post<ISignInRes, ISignInReq>({
      url: `${this._baseURL}/sign-in`,
      data: dto,
    });
  }
}

export default new AuthApi();
