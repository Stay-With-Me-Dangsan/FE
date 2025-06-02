import { useQuery } from '@tanstack/react-query';
import MypageApi from '../../../api-url/auth/mypage.api';
import { IBoardComments } from '../../../types/dto/board/board.dto';

export const useGetBoardCommentsQuery = () => {
  return useQuery<IBoardComments[], Error>({
    queryKey: ['mypage'],
    queryFn: async () => {
      const res = await MypageApi.getboardComments();
      return res.data.data.result;
    },
  });
};
