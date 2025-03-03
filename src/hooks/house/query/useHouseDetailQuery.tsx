import { IHouseDetail } from '../../../types/dto/board';
import HouseApi from '../../../api-url/house/house.api';
import { useQuery } from '@tanstack/react-query';

interface IProps extends IHouseDetail {}

export const useHouseDetailQuery = (props: IProps) => {
  const { houseDetailId } = props;

  return useQuery({
    queryKey: ['house-detail', houseDetailId],
    queryFn: () => HouseApi.getHouseDetail({ houseDetailId }),
    // select: (res) => res.data.data.result,
    enabled: !!houseDetailId,
  });
};
