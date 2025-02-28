import { AxiosConfig } from '../../common/axios-config';
import { ISignInRes } from '../../types/res/auth';
import { ISignInDto } from '../../types/dto/auth';

class AuthApi extends AxiosConfig {
  private readonly _baseURL = '/auth';

  async postSignIn(dto: ISignInDto) {
    return await this.post<ISignInRes, ISignInDto>({
      url: `${this._baseURL}/sign-in`,
      data: dto,
    });
  }

  async postSignUp() {}
}

export default new AuthApi();
