import { AxiosConfig } from '../../common/axios-config';
import { HouseGetMainRes } from '../../types/res/board';
import { HouseGetMainDto } from '../../types/dto/board';

class HouseApi extends AxiosConfig {
  private readonly _baseURL = '/house';

  async getHouseGetMain(dto: HouseGetMainDto) {
    return await this.get<HouseGetMainRes, HouseGetMainDto>({ url: `${this._baseURL}/getMain`, params: dto });
  }
}

export default new HouseApi();
