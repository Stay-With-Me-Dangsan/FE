import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBoardListRes } from '../../types/res/board/board.res';
import { useGetBoardWriteListQuery } from '../../hooks/mypage/query';
import useBoardMutation from '../../hooks/board/mutation/useBoardMutation';
import { useQueryClient } from '@tanstack/react-query';
import { Alert } from '../../components/popup';
import myapge_list from '../../asset/images/myapge_list.png';
import RoomComment from '../../asset/images/RoomComment.png';
import NoHeart from '../../asset/images/RoomLike.png';
import Heart from '../../asset/images/heart.png';
import BoradView from '../../asset/images/board_view.png';
import RoomBookMark from '../../asset/images/RoomBookMark.png';

export const MyPageBoardWrite = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };

  const navigate = useNavigate();

  const { data: boards = [], refetch } = useGetBoardWriteListQuery();
  const { deleteLikeMutation, postLikeMutation } = useBoardMutation();
  const queryClient = useQueryClient();

  // 1)  좋아요 처리
  const handleLike = async (postId: number, liked?: boolean) => {
    if (liked) {
      deleteLikeMutation.mutate(postId, {
        onSuccess: () => {
          showAlert('좋아요를 삭제하였습니다다');
          refetch();
        },
      });
    } else {
      postLikeMutation.mutate(postId, {
        onSuccess: () => {
          showAlert('좋아요 하였습니다다');
          refetch();
        },
      });
    }
  };

  const handelScrap = async (postId: number, marked: boolean) => {
    // if (marked) {
    //   await axios.delete(`/api/scraps/${postId}`, { withCredentials: true });
    // } else {
    //   await axios.post(
    //     `/api/scraps`,
    //     {
    //       boardId: postId,
    //     },
    //     { withCredentials: true },
    //   );
    // }
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['boards', category] });
    // }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-4 px-4 py-8">
      <div className="w-full h-[54px] inline-flex items-center py-10">
        <div className="w-full flex justify-start gap-1 ">
          <div className="float-left flex">
            <p>총 {boards.length}개</p>
          </div>
        </div>
        <div className="float-right content-center">
          <h1>
            <img src={myapge_list} alt="myapge_list" />
          </h1>
        </div>
      </div>
      {boards?.map((board: IBoardListRes) => (
        <div key={board.postId} className=" p-4 rounded-xl shadow-sm bg-white flex flex-col gap-2 w-full">
          <div className="flex">
            <div
              onClick={() => navigate(`/board/detail/${board.boardType}/${board.postId}`)}
              className="cursor-pointer w-[80%]">
              <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{board.title}</h3>
              <p className="mt-2 text-gray-600 text-sm flex-1 line-clamp-2">{board.content}</p>
            </div>
            <div>
              <img src={board.thumbnail} alt="썸네일" className="w-full h-40 object-cover mt-2 rounded" />
            </div>
          </div>
          <div className="flex gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <button onClick={() => handleLike(board.postId, board.liked)} className="focus:outline-none">
                {board.liked ? (
                  <img src={Heart} alt="좋아요" className="w-5 h-5 object-contain" />
                ) : (
                  <img src={NoHeart} alt="안좋아요" className="w-5 h-5 object-contain" />
                )}
              </button>
              <p className="text-md">{board.likeCount}</p>
            </div>
            <div className="flex items-center gap-2">
              <img src={RoomComment} alt="댓글" className="w-5 h-5 object-contain" />
              <p className="text-md">{board.commentCount}</p>
            </div>
            <div className="flex items-center gap-2">
              <img src={BoradView} alt="조회수" className="w-5 h-5 object-contain" />
              <p className="text-md">{board.viewCount}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handelScrap(board.postId, board.marked)}>
                <img src={RoomBookMark} alt="북마크" className="w-5 h-5 object-contain" />
              </button>
              <p className="text-md">{board.marked ? '북마크' : '마크안됨'}</p>
            </div>
          </div>
        </div>
      ))}
      {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
    </div>
  );
};
