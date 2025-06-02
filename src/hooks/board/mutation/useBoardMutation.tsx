import { useMutation, useQueryClient } from '@tanstack/react-query';
import BoardApi from '../../../api-url/board/board.api';
import CommentApi from '../../../api-url/board/comment.api';
import { IBoardCreate } from '../../../types/dto/board';
import { ICreateHouseMain } from '../../../types/dto/house';
import { useAtom } from 'jotai';
import { jwtStore } from '../../../store';
import { UserMinus } from 'lucide-react';

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

  const deleteLikeMutation = useMutation({
    mutationFn: (postId: number) => BoardApi.deleteLikeMutation(postId),
  });

  // const createHouseMainMutation = useMutation({
  //   mutationFn: (data: ICreateHouseMain) => BoardApi.postCreateHouseMain(data),
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({ queryKey: ['house-main'] });
  //   },
  // });

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
    deleteLikeMutation,
    postLikeMutation,
    postBoardViewMutation,
  };
}
