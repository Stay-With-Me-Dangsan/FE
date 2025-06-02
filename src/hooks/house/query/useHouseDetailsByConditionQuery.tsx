import { useQuery } from '@tanstack/react-query';
import HouseApi from '../../../api-url/house/house.api';
import { IHouseFilterCondition } from '../../../types/dto/house';

export const useHouseDetailsByConditionQuery = (filters: IHouseFilterCondition) => {
  return useQuery({
    queryKey: ['house-details-by-condition', filters],
    queryFn: () => HouseApi.getHouseDetailsByCondition(filters),
    enabled: !!filters, // filters가 있을 때만 실행
  });
};
