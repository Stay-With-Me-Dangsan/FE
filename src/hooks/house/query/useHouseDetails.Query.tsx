import { IHouseDetails } from '../../../types/dto/house';
import { useQuery } from '@tanstack/react-query';
import HouseApi from '../../../api-url/house/house.api';
import { HouseMarkerDto } from '../../../types/dto/house';
import { flattenParams } from '../../../utils/query';
interface IProps extends IHouseDetails {}

export const useHouseDetailsQuery = (props: IProps) => {
  return useQuery<HouseMarkerDto[]>({
    queryKey: ['house-details', props],
    queryFn: async () => {
      const flatParams = flattenParams(props) as IHouseDetails;

      console.log('[params]', flatParams);
      const res = await HouseApi.getHouseDetails(flatParams);
      console.log('[params]', flatParams);
      console.log('[query]', new URLSearchParams(flatParams as any).toString());

      if (!res?.data?.data?.result || !Array.isArray(res.data.data.result)) {
        return [];
      }

      return res.data.data.result ?? [];
    },
    enabled: !!props?.minX && !!props?.maxX && !!props?.minY && !!props?.maxY,

    staleTime: 1000 * 60 * 1, // 1분 캐싱
  });
};
