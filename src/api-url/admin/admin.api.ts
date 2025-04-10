import { AxiosConfig } from '../../common/axios-config';
import { IGetCodeDto, ICreateCodeDto, IPatchCodeDto } from '../../types/dto/admin';

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
}
export default new AdminApi();
