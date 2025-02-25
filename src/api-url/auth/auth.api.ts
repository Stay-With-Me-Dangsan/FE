import { AxiosConfig } from '../../common/axios-config';
<<<<<<< Updated upstream
import { SignInRequestDto, SignInResponseDto } from '../../types/interface/dto';
=======
import { ISignInReq, ISignUpReq, IEmailCodeReq } from '../../types/interface/auth/req';
import { ISignInRes, ISignUpRes } from '../../types/interface/auth/res';
>>>>>>> Stashed changes

class AuthApi extends AxiosConfig {
  private readonly _baseURL = '/user';

<<<<<<< Updated upstream
  constructor() {
    super();
  }

  async postSignIn(dto: SignInRequestDto) {
    return await this.post<SignInResponseDto, SignInRequestDto>({
      url: `${this._baseURL}/sign-in`,
      data: dto,
    });
  }
=======
  async postSignIn(dto: ISignInReq) {
    return await this.post<ISignInRes, ISignInReq>({
      url: `${this._baseURL}/signIn`,
      data: dto,
    });
  }

  async postSignUp(dto: ISignUpReq) {
    return await this.post<ISignUpRes, ISignUpReq>({
      url: `${this._baseURL}/signUp`,
      data: dto,
    });
  }

  async sendEmailMutation(email: string) {
    return await this.post({
      url: `${this._baseURL}/EmailCodeSend`,
      data: email,
    });
  }

  async postFindPw(email: string) {
    return await this.post({
      url: `${this._baseURL}/findPw`,
      data: email,
    });
  }

  // async verifyCodeMutation(dto: IEmailCodeReq) {
  //   return await this.post<IEmailCodeReq>({
  //     url: `${this._baseURL}/EmailCodeverify`,
  //     data: dto,
  //   });
  // }
>>>>>>> Stashed changes
}

export default new AuthApi();
