import { AxiosConfig } from '../../common/axios-config';
import { SignInRequestDto, SignInResponseDto } from '../../types/interface/dto';

class AuthApi extends AxiosConfig {
  private readonly _baseURL = '/auth';

  constructor() {
    super();
  }

  async postSignIn(dto: SignInRequestDto) {
    return await this.post<SignInResponseDto, SignInRequestDto>({
      url: `${this._baseURL}/sign-in`,
      data: dto,
    });
  }
}

export default new AuthApi();
