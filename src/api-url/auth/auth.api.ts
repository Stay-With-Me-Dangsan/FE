import { SignInReqDto, SignInRes } from '../../types/interface/dto';
import { AxiosConfig } from '../../common/axios-config';

class AuthApi extends AxiosConfig {
  private readonly _baseURL = '/auth';

  async postSignIn(dto: SignInReqDto) {
    return await this.post<SignInRes, SignInReqDto>({
      url: `${this._baseURL}/sign-in`,
      data: dto,
    });
  }
}

export default new AuthApi();
