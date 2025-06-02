import { useAtom } from 'jotai';
import { userIdAtom, roleAtom, decodeJwt } from '../../store/jwt';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueries, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Heart, Trash2, Pencil } from 'lucide-react';
import { IBoardDetailtRes, IBoardCommentRes } from '../../types/res/board/board.res';
import { useGetBoardDetailQuery, useGetBoardCommentsQuery } from '../../hooks/board/query';
import useBoardMutation from '../../hooks/board/mutation/useBoardMutation';
import RoomBookMark from '../../asset/images/RoomBookMark.png';
import noMark from '../../asset/images/no_marked.png';
import RoomComment from '../../asset/images/RoomComment.png';
import RoomLike from '../../asset/images/RoomLike.png';
import BoradView from '../../asset/images/board_view.png';
import room from '../../asset/images/room1.png';
import logo from '../../asset/images/logo.png';
import person from '../../asset/images/person.png';
import dot from '../../asset/images/dot.png';

const reportReasons = ['욕설/비하', '홍보/영리 목적', '음란물', '개인정보 노출', '기타 부적절한 내용'];

export const BoardDetail = () => {
  const { id } = useParams();
  const paramId = id ?? '';
  const boardId = id ?? '';
  const postId = Number(paramId);
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const { postBoardViewMutation } = useBoardMutation();
  const { mutate: recordView, isError: recordError } = postBoardViewMutation;
  const [viewRecorded, setViewRecorded] = useState(false);

  useEffect(() => {
    if (postId > 0) {
      recordView(postId, {
        onSuccess: () => {
          setViewRecorded(true);
        },
        onError: () => {
          console.error('조회 이력 기록 실패');
        },
      });
    }
  }, [postId, recordView]);

  const { data: board, isLoading: isBoardLoading, isError: isBoardError } = useGetBoardDetailQuery(postId);

  const {
    data: comments = [],
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    refetch: refetchComments,
  } = useGetBoardCommentsQuery(postId);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };

  const [userId] = useAtom(userIdAtom);

  const commentMutation = useMutation({
    mutationFn: async () => {
      await axios.post(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_PREFIX}/comments`, {
        boardId,
        content: commentText,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', boardId] });
      setCommentText('');
      refetchComments();
    },
  });

  const commentUpdateMutation = useMutation({
    mutationFn: async () => {
      if (editingCommentId === null) return;
      await axios.put(
        `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_PREFIX}/comments/${editingCommentId}`,
        {
          content: editContent,
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', boardId] });
      setEditingCommentId(null);
      setEditContent('');
    },
  });

  const commentDeleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_PREFIX}/comments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', boardId] });
    },
  });

  const reportMutation = useMutation({
    mutationFn: async () => {
      await axios.post(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_PREFIX}/reports`, {
        boardId,
        userId,
        reportType: selectedReason,
        reportCategory: '게시글',
      });
    },
    onSuccess: () => {
      setShowReportModal(false);
      setSelectedReason('');
      alert('신고가 접수되었습니다.');
    },
    onError: () => {
      alert('신고 중 오류가 발생했습니다.');
    },
  });

  const likeMutation = useMutation({
    mutationFn: async ({ postId, liked }: { postId: number; liked: number }) => {
      if (liked) {
        await axios.delete(`/api/likes/${postId}`, { withCredentials: true });
      } else {
        await axios.post(
          `/api/likes`,
          {
            boardId: postId,
          },
          { withCredentials: true },
        );
      }
    },
    onSuccess: () => {},
  });
  const handleLike = (postId: number, liked: number) => {
    if (!userId) {
      showAlert('로그인이 필요합니다!');
      return;
    }
    likeMutation.mutate({ postId, liked });
  };
  const handelScrap = async (postId: number, marked: boolean) => {
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

  // 2) 로딩 중 처리
  if (isBoardLoading || isCommentsLoading) {
    return <div className="p-4 text-center">로딩 중…</div>;
  }

  // 3) 에러 처리
  if (isBoardError) {
    return <div className="p-4 text-center text-red-500">게시글을 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (isCommentsError) {
    return <div className="p-4 text-center text-red-500">댓글을 불러오는 중 오류가 발생했습니다.</div>;
  }
  // 4) 데이터 없을 때 처리
  if (!board) {
    return <div className="p-4 text-center text-gray-500">해당 게시글이 존재하지 않습니다.</div>;
  }

  return (
    <div className="maxfull mx-auto p-4">
      <div key={board.postId} className=" p-4 rounded-xl shadow-sm bg-white flex flex-col gap-2 w-full">
        <div className="flex mb-4">
          <img src={person} alt="글쓴이 이미지" className="w-12 h-12" />
          <div className="grid ml-2 items-center">
            <span className="text-md text-400 block ">{board.nickname}</span>
            <span className="text-md text-gray-400 block ">{board.createdAt}</span>
          </div>
        </div>
        <div className="flex">
          <div className="cursor-pointer w-[80%]">
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{board.title}</h3>
            <p className="mt-2 text-gray-600 text-sm flex-1 line-clamp-2">{board.content}</p>
          </div>
          <div></div>
        </div>
        <div className="flex gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <button>
              <img src={RoomLike} alt="좋아요" className="w-5 h-5 object-contain" />
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
          {/* <div className="flex items-center gap-2">
              <button onClick={() => handelScrap(board.postId, board.marked)}>
                <img src={RoomBookMark} alt="북마크" className="w-5 h-5 object-contain" />
              </button>
              <p className="text-md">{board.marked ? '북마크' : '마크안됨'}</p>
            </div> */}
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">댓글</h2>
        <p>{comments.length}개</p>

        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-10 text-gray-500">
            <img src={logo} alt="로고" className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-sm">첫 댓글을 남겨주세요.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment: IBoardCommentRes) => (
              <div key={comment.id} className="p-4 border rounded bg-gray-50">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="flex mb-4">
                      <img src={person} alt="글쓴이 이미지" className="w-12 h-12" />
                      <div className="grid ml-2 items-center">
                        <span className="text-md text-400 block ">{comment.nickname}</span>
                      </div>
                    </div>
                    {editingCommentId === comment.commentId ? (
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      <div className="text-xs text-gray-500 grid items-center gap-1">
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{comment.content}</p>
                        <div className="flex mt-2 items-center gap-2">
                          <span className="text-md text-gray-400 block ">{comment.createdAt}</span>
                          <img src={RoomLike} alt="좋아요" className="w-4 h-4 text-gray-400" /> {comment.likeCount}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <img src={dot} alt="댓글 메뉴"></img>

                    {/* 
                    {editingCommentId === comment.id ? (
                      <button
                        onClick={() => commentUpdateMutation.mutate()}
                        className="text-xs text-blue-500 hover:underline">
                        저장
                      </button>
                    ) : (
                      <div className="flex gap-2 mt-1">
                        <Pencil
                          className="w-4 h-4 text-gray-500 hover:text-blue-500 cursor-pointer"
                          onClick={() => {
                            setEditingCommentId(comment.id);
                            setEditContent(comment.content);
                          }}
                        />
                        <Trash2
                          className="w-4 h-4 text-gray-500 hover:text-red-500 cursor-pointer"
                          onClick={() => {
                            if (window.confirm('댓글을 삭제하시겠습니까?')) {
                              commentDeleteMutation.mutate(comment.id);
                            }
                          }}
                        />
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            commentMutation.mutate();
          }}
          className="flex mt-4 gap-2 mb-4">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700">
            등록
          </button>
        </form>
      </div>

      {/* 신고 모달 */}
      {/* {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[320px] shadow-xl">
            <h3 className="text-base font-bold text-gray-800 mb-4">
              선택하신 글/댓글 등을 다음 중 어떤 사항으로 신고하시겠습니까?
            </h3>
            <ul className="space-y-2 mb-6">
              {reportReasons.map((reason) => (
                <li key={reason}>
                  <button
                    type="button"
                    onClick={() => setSelectedReason(reason)}
                    className={`w-full flex items-center gap-3 border px-4 py-2 rounded-lg text-sm transition ${
                      selectedReason === reason
                        ? 'border-purple-600 text-purple-600 font-semibold bg-purple-50'
                        : 'text-gray-700 border-gray-300'
                    }`}>
                    <div
                      className={`w-4 h-4 border rounded-sm flex items-center justify-center ${
                        selectedReason === reason ? 'bg-purple-600 border-purple-600' : 'border-gray-400'
                      }`}>
                      {selectedReason === reason && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </div>
                    {reason}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReportModal(false)}
                className="text-sm px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">
                취소
              </button>
              <button
                onClick={() => reportMutation.mutate()}
                className="text-sm px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
                disabled={!selectedReason}>
                신고하기
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};
