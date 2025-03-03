import { useQuery } from '@tanstack/react-query';
import HouseApi from '../../../api-url/house/house.api';

export const useHouseDetailsByConditionQuery = () => {
  return useQuery({
    queryKey: ['house-details-by-condition'],
    queryFn: () => HouseApi.getHouseDetailsByCondition(),
  });
};
