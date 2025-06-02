import { useQuery } from '@tanstack/react-query';
import MypageApi from '../../../api-url/auth/mypage.api';
import { IBoardListRes } from '../../../types/res/board/board.res';

export const useGetBoardLikeListQuery = () => {
  return useQuery<IBoardListRes[], Error>({
    queryKey: ['mypage'],
    queryFn: async () => {
      const res = await MypageApi.getBoardLike();
      console.log('res: ', res);
      return res.data.data.result;
    },
  });
};
