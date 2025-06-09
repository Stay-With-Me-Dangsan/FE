import HouseApi from '../../../api-url/house/house.api';
import { useQuery } from '@tanstack/react-query';
import { IHouseDetailDto } from '../../../types/dto/house';

export const useHouseDetailQuery = (houseDetailId: number) => {
  return useQuery<IHouseDetailDto, Error>({
    queryKey: ['house-detail', houseDetailId],
    enabled: houseDetailId !== null,
    queryFn: async () => {
      const res = await HouseApi.getHouseDetail(houseDetailId);
      console.log('res: ', res);
      return res.data.data.result as IHouseDetailDto;
    },
  });
};
