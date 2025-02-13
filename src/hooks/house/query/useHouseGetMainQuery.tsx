import { useQuery } from '@tanstack/react-query';
import HouseApi from '../../../api-url/house/house.api';

export const useHouseGetMainQuery = (houseMainId: number | null) => {
  return useQuery({
    queryKey: ['houseGetMain', houseMainId],
    queryFn: () => HouseApi.getHouseGetMain({ houseMainId }),
    select: (res) => res.data.data.result,
    enabled: !!houseMainId,
  });
};
