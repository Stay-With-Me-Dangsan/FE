import { useQuery } from '@tanstack/react-query';
import HouseApi from '../../../api-url/house/house.api';
import { IHouseMainDto } from '../../../types/dto/board';

interface IProps {
  houseMainId: IHouseMainDto;
}

export const useHouseGetMainQuery = (props: IProps) => {
  const { houseMainId } = props;

  return useQuery({
    queryKey: ['houseGetMain', houseMainId],
    queryFn: () => HouseApi.getHouseMain(houseMainId),
    select: (res) => res.data.data.result,
    enabled: !!houseMainId,
  });
};
