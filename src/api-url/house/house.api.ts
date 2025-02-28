import { AxiosConfig } from '../../common/axios-config';
import { HouseGetMainRes } from '../../types/res/board';
import {
  ICreateHouseDetail,
  ICreateHouseMain,
  IDeleteHouseDetail,
  IHouseDetail,
  IHouseDetails,
  IHouseMainDto,
  IPatchUpdateHouseDetail,
} from '../../types/dto/board';

class HouseApi extends AxiosConfig {
  private readonly _baseURL = '/house';

  async getHouseMain(dto: IHouseMainDto) {
    return await this.get<HouseGetMainRes, IHouseMainDto>({ url: `${this._baseURL}/getMain`, params: dto });
  }

  async getHouseDetail(dto: IHouseDetail) {
    return await this.get<null, IHouseDetail>({ url: `${this._baseURL}/getDetail`, params: dto });
  }

  async getHouseDetails(dto: IHouseDetails) {
    return await this.get<null, IHouseDetails>({ url: `${this._baseURL}/getDetails`, params: dto });
  }

  async getHouseDetailsByCondition() {
    return await this.get<null, null>({ url: `${this._baseURL}/getDetailsByCondition` });
  }

  async postCreateHouseMain(dto: ICreateHouseMain) {
    return await this.post<null, ICreateHouseMain>({ url: `${this._baseURL}/createMain`, data: dto });
  }

  async postCreateHouseDetail(dto: ICreateHouseDetail) {
    return await this.post<null, ICreateHouseDetail>({ url: `${this._baseURL}/createDetail`, data: dto });
  }

  async patchUpdateHouseDetail(dto: IPatchUpdateHouseDetail) {
    return await this.patch<null, IPatchUpdateHouseDetail>({ url: `${this._baseURL}/updateDetail`, data: dto });
  }

  async deleteHouseDetail(dto: IDeleteHouseDetail) {
    return await this.delete<null, IHouseDetail>({ url: `${this._baseURL}/deleteDetail`, params: dto });
  }
}

export default new HouseApi();
