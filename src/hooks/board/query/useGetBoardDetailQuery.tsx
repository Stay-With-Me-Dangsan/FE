// hooks/house.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import BoardApi from '../../../api-url/board/board.api';
import { IBoardDetailtRes } from '../../../types/res/board/board.res';

export const useGetBoardDetailQuery = (postId: number) => {
  return useQuery<IBoardDetailtRes, Error>({
    queryKey: ['board', postId],
    queryFn: async () => {
      const res = await BoardApi.getBoardByIdMutation(postId);
      console.log('디테일: ', res);
      return res.data.data.result;
    },
  });
};
