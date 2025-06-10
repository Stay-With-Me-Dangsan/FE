// hooks/house.ts
import { useQuery } from '@tanstack/react-query';
import CommentApi from '../../../api-url/board/comment.api';
import { IBoardCommentRes } from '../../../types/res/board/board.res';

export const useGetBoardCommentsQuery = (postId: number) => {
  return useQuery<IBoardCommentRes[], Error>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const res = await CommentApi.getCommentsByPostIdMutation(postId);
      console.log('댓글: ', res);
      return res.data.data.result;
    },
  });
};
