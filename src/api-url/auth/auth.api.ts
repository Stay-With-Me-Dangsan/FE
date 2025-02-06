import { SignInRequestDto, SignInResponseDto } from '../../types/interface/dto';
import { AxiosConfig } from '../../common/axios-config';

class AuthApi extends AxiosConfig {
  private readonly _baseURL = '/auth';

  async postSignIn(dto: SignInRequestDto) {
    console.log('dto', dto);

    return await this.post<SignInResponseDto, SignInRequestDto>({
      url: `${this._baseURL}/sign-in`,
      data: dto,
    });
  }
}

export default new AuthApi();
