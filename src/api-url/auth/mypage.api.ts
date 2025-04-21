import { AxiosConfig } from '../../common/axios-config';
import { IUpdateNicknameRes, IUpdateEmailRes, IUpdatePwRes, IgetMypageRes } from '../../types/res/auth';
import { IPatchUpdateNicknameDto, IPatchEmailDto, IPatchPwDto } from '../../types/dto/auth';
import { IHouseDetailDto } from '../../types/dto/house';

class MypageApi extends AxiosConfig {
  private readonly _baseURL = '/mypage';

  async getMyPage(userId: number) {
    return await this.get<IgetMypageRes, { userId: number }>({
      url: `${this._baseURL}/${userId}`,
      params: { userId },
    });
  }

  async gethouseUpload() {
    return await this.get<IHouseDetailDto[], null>({
      url: `${this._baseURL}/house/upload`,
    });
  }

  async gethouseLike() {
    return await this.get<IHouseDetailDto[], null>({
      url: `${this._baseURL}/house/bookmark`,
    });
  }

  async gethouseView() {
    return await this.get<IHouseDetailDto[], null>({
      url: `${this._baseURL}/house/view`,
    });
  }

  async patchUpdateNickname(dto: IPatchUpdateNicknameDto) {
    return await this.patch<IUpdateNicknameRes, IPatchUpdateNicknameDto>({
      url: `${this._baseURL}/update/nickname`,
      data: dto,
    });
  }

  async patchUpdateEmail(dto: IPatchEmailDto) {
    return await this.patch<IUpdateEmailRes, IPatchEmailDto>({
      url: `${this._baseURL}/update/email`,
      data: dto,
    });
  }
  async patchUpdatePw(dto: IPatchPwDto) {
    return await this.patch<IUpdatePwRes, IPatchPwDto>({
      url: `${this._baseURL}/update/pw`,
      data: dto,
    });
  }

  async postLogOut() {
    return await this.post({
      url: `${this._baseURL}/logout`,
      data: null,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });
  }
}

export default new MypageApi();
