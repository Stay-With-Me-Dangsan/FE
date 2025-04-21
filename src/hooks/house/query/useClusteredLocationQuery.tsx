import HouseApi from '../../../api-url/house/house.api';
import { useQuery } from '@tanstack/react-query';

export const useMostClusteredLocationQuery = () => {
  return useQuery({
    queryKey: ['clustered-location'],
    queryFn: () => HouseApi.getMainClusteredHouses(),
    select: (res) => res.data.data.result,
  });
};
