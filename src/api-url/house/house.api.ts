import { AxiosConfig } from '../../common/axios-config';
import { IHouseMainRes } from '../../types/res/house';
import {
  ICreateHouseDetail,
  ICreateHouseMain,
  IDeleteHouseDetail,
  IHouseDetail,
  IHouseDetails,
  IHouseMainDto,
  IPatchUpdateHouseDetail,
  ClusterWithHouses,
} from '../../types/dto/house';

class HouseApi extends AxiosConfig {
  private readonly _baseURL = '/house';

  async getHouseMain(dto: IHouseMainDto) {
    return await this.get<IHouseMainRes, IHouseMainDto>({ url: `${this._baseURL}/getMain`, params: dto });
  }

  async getHouseDetail(dto: IHouseDetail) {
    return await this.get<null, IHouseDetail>({ url: `${this._baseURL}/getDetail`, params: dto });
  }

  async getHouseDetails(dto: IHouseDetails) {
    return await this.get<null, IHouseDetails>({ url: `${this._baseURL}/getDetails`, params: dto });
  }

  async getHouseDetailsByCondition(filters: Record<string, any>) {
    return await this.get<null, any>({ url: `${this._baseURL}/getDetailsByCondition`, params: filters });
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

  async getClusteredHouses() {
    return await this.get<ClusterWithHouses[], null>({
      url: `${this._baseURL}/clustered`,
    });
  }
}

export default new HouseApi();
