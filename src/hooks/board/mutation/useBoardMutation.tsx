import { useMutation } from '@tanstack/react-query';
import BoardApi from '../../../api-url/board/board.api';
import CommentApi from '../../../api-url/board/comment.api';
import { IBoardCreate, IBoardCommentCreate } from '../../../types/dto/board';

export default function useBoardMutation() {
  const getBoardByIdMutation = useMutation({
    mutationFn: (postId: number) => BoardApi.getBoardByIdMutation(postId),
  });

  const getCommentsByPostIdMutation = useMutation({
    mutationFn: (postId: number) => CommentApi.getCommentsByPostIdMutation(postId),
  });

  const postBoardMutation = useMutation({
    mutationFn: (data: IBoardCreate) => BoardApi.postBoardMutation(data),
  });

  const postBoardViewMutation = useMutation<unknown, Error, number>({
    mutationFn: (postId: number) => BoardApi.postBoardViewMutation(postId),
  });

  const postLikeMutation = useMutation({
    mutationFn: (postId: number) => BoardApi.postLikeMutation(postId),
  });

  const postCommentMutation = useMutation({
    mutationFn: (data: IBoardCommentCreate) => CommentApi.postCommentMutation(data),
  });

  const patchCommentMutation = useMutation({
    mutationFn: (data: IBoardCommentCreate) => CommentApi.patchCommentMutation(data),
  });

  const deleteLikeMutation = useMutation({
    mutationFn: (postId: number) => BoardApi.deleteLikeMutation(postId),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => CommentApi.deleteCommentMutation(commentId),
  });

  // const postBoardLikeMutation = useMutation({
  //   mutationFn: async ({ postId, liked }: { postId: number; liked: boolean }) => {
  //     if (liked) {
  //       await axios.delete(`/api/likes/${postId}`, { withCredentials: true });
  //     } else {
  //       await axios.post(
  //         `/api/likes`,
  //         {
  //           boardId: postId,
  //         },
  //         { withCredentials: true },
  //       );
  //     }
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['boards', activeTab] });
  //   },
  // });

  return {
    // getBoardsByCategoryMutation,

    getBoardByIdMutation,
    getCommentsByPostIdMutation,
    postBoardMutation,
    postLikeMutation,
    postBoardViewMutation,
    postCommentMutation,
    patchCommentMutation,
    deleteLikeMutation,
    deleteCommentMutation,
  };
}
