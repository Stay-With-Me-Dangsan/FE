import { AxiosConfig } from '../../common/axios-config';
import { IGetCodeDto, ICreateCodeDto, IPatchCodeDto, CommonCode } from '../../types/dto/admin';

class commonCodeApi extends AxiosConfig {
  private readonly _baseURL = '/commonCode';

  async getCode(dto: IGetCodeDto) {
    return await this.get<CommonCode[], IGetCodeDto>({
      url: `${this._baseURL}/get`,
      params: dto,
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
export default new commonCodeApi();
