// hooks/house.ts
import { useQuery } from '@tanstack/react-query';
import HouseApi from '../../../api-url/house/house.api';
import { IHouseFilterCondition } from '../../../types/dto/house';
// import { ClusterWithHouses } from '../../../types/interface/house';

export const useGetFilteredClusterQuery = (filterCondition: IHouseFilterCondition) => {
  return useQuery({
    queryKey: ['filteredClusters', filterCondition],
    queryFn: () => HouseApi.getHouseDetailsByCondition(filterCondition),
    enabled: !!filterCondition.minX && !!filterCondition.minY && !!filterCondition.maxX && !!filterCondition.maxY,
    staleTime: 0, // 매번 새로 가져오게 설정 (필터링은 민감하니까)
    refetchOnWindowFocus: false,
  });
};
