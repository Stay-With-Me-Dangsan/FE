import { AxiosConfig } from '../../common/axios-config';
import { HouseGetMainReqDto, HouseGetMainRes } from '../../types/interface/dto';

class HouseApi extends AxiosConfig {
  private readonly _baseURL = '/house';

  async getHouseGetMain(dto: HouseGetMainReqDto) {
    return await this.get<HouseGetMainRes, HouseGetMainReqDto>({
      url: `${this._baseURL}/getMain`,
      params: dto,
    });
  }
}

export default new HouseApi();
