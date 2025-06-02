// hooks/house.ts
import { useQuery } from '@tanstack/react-query';
import BoardApi from '../../../api-url/board/board.api';
import { IBoardListRes } from '../../../types/res/board/board.res';

export const useGetAllBoardListQuery = (category: string, userId?: number | null) => {
  return useQuery<IBoardListRes[], Error>({
    queryKey: ['boards', category, userId],
    queryFn: async () => {
      if (userId != null) {
        const res = await BoardApi.getBoardsByCategoryMutation(category, userId);
        console.log('res: ', res);
        return res.data?.data?.result;
      }
      const res = await BoardApi.getAllBoardsByCategoryMutation(category);
      console.log('res: ', res);
      return res.data?.data?.result;
    },
  });
};
