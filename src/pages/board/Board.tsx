import { useAtom } from 'jotai';
import { userIdAtom, roleAtom, decodeJwt } from '../../store/jwt';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import axios from 'axios';
import RoomBookMark from '../../asset/images/RoomBookMark.png';
import noMark from '../../asset/images/no_marked.png';
import RoomComment from '../../asset/images/RoomComment.png';
import NoHeart from '../../asset/images/RoomLike.png';
import Heart from '../../asset/images/heart.png';
import BoradView from '../../asset/images/board_view.png';

import { IBoardListRes } from '../../types/res/board/board.res';
import useBoardMutation from '../../hooks/board/mutation/useBoardMutation';
import { useGetAllBoardListQuery } from '../../hooks/board/query';

const categories = [
  { label: '자유게시판', value: '자유게시판' },
  { label: '정보게시판', value: '정보게시판' },
  { label: '질문게시판', value: '질문게시판' },
  { label: '호스트게시판', value: '호스트게시판' },
  { label: '세입자게시판', value: '세입자게시판' },
];

export const Board = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('자유게시판');
  const [userId] = useAtom(userIdAtom);

  const { data: boards = [], refetch } = useGetAllBoardListQuery(category, userId);

  const [content, setContent] = useState('');
  const { deleteLikeMutation, postLikeMutation } = useBoardMutation();
  const queryClient = useQueryClient();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };

  const handleBoardWrite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (userId) {
      navigate('/board/write');
    }

    showAlert('로그인이 필요합니다!');
    return;
  };

  // 2) 로그인 체크 후 좋아요 처리
  const handleLike = async (postId: number, liked?: boolean) => {
    if (!userId) {
      showAlert('로그인이 필요합니다!');
      return;
    }

    if (liked) {
      deleteLikeMutation.mutate(postId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards', category] });
        },
      });
    } else {
      console.log('좋아요!', postId);
      postLikeMutation.mutate(postId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards', category] });
        },
      });
    }
  };

  const handelScrap = async (postId: number, marked: boolean) => {
    if (!userId) {
      showAlert('로그인이 필요합니다!');
      return;
    }

    if (marked) {
      await axios.delete(`/api/scraps/${postId}`, { withCredentials: true });
    } else {
      await axios.post(
        `/api/scraps`,
        {
          boardId: postId,
        },
        { withCredentials: true },
      );
    }

    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['boards', category] });
    // }
  };

  return (
    <div className="h-full">
      {/* 탭 카테고리 */}
      <div className="flex gap-20 pb-2">
        {categories.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setCategory(tab.value)}
            className={`text-sm font-semibold pb-1 transition-all duration-200 ${
              category === tab.value
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 게시글 목록 */}
      <div className="mt-6 space-y-4">
        {/* {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>} */}
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

                {/* <img src={room} alt="이미지" /> */}
              </div>
            </div>
            <div className="flex gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                {/* 내가 좋아요했으면 빨간색 FaHeart, 아니면 회색 FaRegHeart */}
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
      </div>

      {/* 임시 이모지 삽입 결과 출력 */}
      {content && (
        <div className="mt-4 text-sm text-gray-700">
          <span className="font-semibold">이모지 미리보기:</span> {content}
        </div>
      )}

      {/* 글쓰기 버튼 */}
      <div className="fixed bottom-[90px] right-[400px] z-50 flex flex-col items-end gap-2">
        <button
          onClick={(e) => handleBoardWrite(e)}
          className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};
