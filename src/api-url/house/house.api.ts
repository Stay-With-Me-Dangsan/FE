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
  IHouseFilterCondition,
} from '../../types/dto/house';
import { ClusterWithHouses } from '../../types/interface/house';

class HouseApi extends AxiosConfig {
  private readonly _baseURL = '/house';

  async getHouseMain(dto: IHouseMainDto) {
    return await this.get<IHouseMainRes, IHouseMainDto>({ url: `${this._baseURL}/getMain`, params: dto });
  }

  async getHouseDetail(houseDetailId: number) {
    return await this.get<IHouseDetail, { houseDetailId: number }>({
      url: `${this._baseURL}/getDetail/${houseDetailId}`,
    });
  }

  async getHouseDetails(dto: IHouseDetails) {
    return await this.get<null, IHouseDetails>({ url: `${this._baseURL}/getDetails`, params: dto });
  }

  async getMainClusteredHouses() {
    return await this.get<ClusterWithHouses[], null>({ url: `${this._baseURL}/main/clustered` });
  }

  async getClusteredHouses(dto: IHouseDetails) {
    return await this.get<ClusterWithHouses[], IHouseDetails>({ url: `${this._baseURL}/clustered`, params: dto });
  }

  async getHouseDetailsByCondition(dto: IHouseFilterCondition) {
    return await this.post<ClusterWithHouses[], IHouseFilterCondition>({
      url: `${this._baseURL}/postDetailsByCondition`,
      data: dto,
    });
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

  async postLikeMutation(houseDetailId: number) {
    return await this.post({
      url: `${this._baseURL}/insert/like`,
      data: houseDetailId,
    });
  }

  async deleteLikeMutation(houseDetailId: number) {
    return await this.delete<number, { houseDetailId: number }>({
      url: `${this._baseURL}/delete/like`,
      params: { houseDetailId },
    });
  }
}

export default new HouseApi();
