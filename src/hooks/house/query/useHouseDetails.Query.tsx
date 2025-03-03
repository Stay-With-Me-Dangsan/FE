import { IHouseDetails } from '../../../types/dto/board';
import { useQuery } from '@tanstack/react-query';
import HouseApi from '../../../api-url/house/house.api';

interface IProps extends IHouseDetails {}

export const useHouseDetailsQuery = (props: IProps) => {
  const { minX, minY, maxX, maxY } = props;

  return useQuery({
    queryKey: ['house-details', minX, minY, maxX, maxY],
    queryFn: () => HouseApi.getHouseDetails({ minX, minY, maxX, maxY }),
    // select: (res) => res.data.data.result,
  });
};
