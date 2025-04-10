import { useQuery } from '@tanstack/react-query';
import HouseApi from '../../../api-url/house/house.api';

export const useHouseDetailsByConditionQuery = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ['house-details-by-condition', filters],
    queryFn: () => HouseApi.getHouseDetailsByCondition(filters),
    enabled: !!filters, // filters가 있을 때만 실행
  });
};
