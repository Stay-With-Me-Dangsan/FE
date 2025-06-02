import { AxiosConfig } from '../../common/axios-config';
import { IGetCodeDto, ICreateCodeDto, IPatchCodeDto, IBoardListRes, IBoardDetailtRes } from '../../types/dto/admin';

class AdminApi extends AxiosConfig {
  private readonly _baseURL = '/admin';

  async getCode(dto: IGetCodeDto) {
    return await this.post({
      url: `${this._baseURL}/get`,
      data: dto,
    });
  }

  async postCreate(dto: ICreateCodeDto) {
    return await this.post({
      url: `${this._baseURL}/create`,
      data: dto,
    });
  }

  async patchCode(dto: IPatchCodeDto) {
    return await this.patch({
      url: `${this._baseURL}/update`,
      data: dto,
    });
  }

  async deleteCode(commonCodeId: number) {
    return await this.post({
      url: `${this._baseURL}/delete`,
      data: { commonCodeId },
    });
  }

  // 유저
  async getAdminUserList() {
    return await this.get({
      url: `${this._baseURL}/user/list`,
    });
  }

  // 유저
  async getAdminUserDetail(userId: number) {
    return await this.get({
      url: `${this._baseURL}/user/detail/{user_id}`,
      params: { userId },
    });
  }

  // 게시판
  async getAdminBoardList(category: string) {
    return await this.get<IBoardListRes[], { category: string }>({
      url: `${this._baseURL}/board/list`,
      params: { category },
    });
  }

  async updateBoardBlind(selectedIds: number[]) {
    return await this.patch({
      url: `${this._baseURL}/board/blind/update`,
      data: selectedIds,
    });
  }
}
export default new AdminApi();
