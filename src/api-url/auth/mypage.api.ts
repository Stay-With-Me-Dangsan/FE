import { AxiosConfig } from '../../common/axios-config';
import { IUpdateNicknameRes, IUpdateEmailRes, IUpdatePwRes, IgetMypageRes } from '../../types/res/auth';
import { IPatchUpdateNicknameDto, IPatchEmailDto, IPatchPwDto } from '../../types/dto/auth';
import { IHouseDetailDto } from '../../types/dto/house';
import { IBoardDto, IBoardComments } from '../../types/dto/board';
import { IBoardListRes } from '../../types/res/board/board.res';

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

  // 찜 추가
  async postHouseLike(houseDetailId: number) {
    return await this.post<IHouseDetailDto[], { houseDetailId: number }>({
      url: `${this._baseURL}/house/bookmark/${houseDetailId}`,
      data: { houseDetailId },
    });
  }

  // 찜 취소
  async cancelHouseLike(houseDetailId: number) {
    return await this.delete<IHouseDetailDto[], { houseDetailId: number }>({
      url: `${this._baseURL}/house/bookmark/cancle/${houseDetailId}`,
    });
  }

  async gethouseView() {
    return await this.get<IHouseDetailDto[], null>({
      url: `${this._baseURL}/house/view`,
    });
  }

  async getboardUpload() {
    return await this.get<IBoardListRes[], null>({
      url: `${this._baseURL}/board/upload`,
    });
  }

  async getboardComments() {
    return await this.get<IBoardComments[], null>({
      url: `${this._baseURL}/board/comments`,
    });
  }

  async getBoardLike() {
    return await this.get<IBoardListRes[], null>({
      url: `${this._baseURL}/board/like`,
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
