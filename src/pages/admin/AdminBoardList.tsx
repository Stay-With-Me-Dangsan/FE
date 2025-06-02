import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAdminMutation from '../../hooks/admin/mutation/useAdminMutation';
import { IBoardListRes } from '../../types/res/board/board.res';

import { useBoardListQuery } from '../../hooks/admin/query/useBoardListQuery';
import RoomComment from '../../asset/images/RoomComment.png';
import RoomLike from '../../asset/images/RoomLike.png';
const categories = [
  { label: '자유게시판', value: '자유게시판' },
  { label: '정보게시판', value: '정보게시판' },
  { label: '질문게시판', value: '질문게시판' },
  { label: '호스트게시판', value: '호스트게시판' },
  { label: '세입자게시판', value: '세입자게시판' },
];

export const AdminBoardList = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('자유게시판');
  const { data: boards = [], refetch } = useBoardListQuery(category);
  // const [boards, setBoards] = useState<IBoardListRes[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { onpatchBoardBlindMutatiion } = useAdminMutation();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleDelete = (selectedIds: number[]) => {
    console.log('삭제할 IDs:', selectedIds);
    if (selectedIds.length === 0) {
      showAlert('삭제할 항목을 선택해주세요.');
      return;
    }
    // TODO: 선택된 게시글 IDs 삭제 로직 호출
    onpatchBoardBlindMutatiion.mutate(selectedIds, {
      onSuccess: () => {
        refetch();
        alert('게시글 블라인드 처리가 완료되었습니다.');
      },
      onError: () => {
        //  setErrorMessage('이메일 찾기 실패');
        showAlert('게시글 블라인드 처리 실패');
      },
    });
  };

  // useEffect(() => {
  //   console.log('category: ', category);
  //   getAdminBoardListMutation.mutate(category, {
  //     onSuccess: (res: any) => {
  //       const boardList = res.data.data.result;
  //       console.log(boardList);
  //       console.log(res.data.data.result);
  //       setBoards(boardList);
  //     },
  //     onError: (err) => {
  //       showAlert('업로드한 게시글 불러오기 실패');
  //       console.error(err);
  //     },
  //   });
  // }, [category]);

  return (
    <div className="w-full h-full flex flex-col items-center gap-4 px-4 py-8">
      {/* 카테고리 탭 */}
      <div className="w-full h-10 border-gray-200">
        <div className="flex gap-6 px-4 overflow-x-auto">
          {categories.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setCategory(tab.value)}
              className={`whitespace-nowrap text-xl font-bold pb-2 transition-all duration-200 ${
                category === tab.value
                  ? 'text-purple-600 border-purple-600 border-b-4'
                  : 'text-gray-700 border-transparent hover:text-purple-600 hover:border-purple-300'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setEditMode((prev) => !prev);
          // 편집 모드 진입 시 선택 초기화
          if (!editMode) setSelectedIds([]);
        }}
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded">
        {editMode ? '편집 종료' : '목록 편집하기'}
      </button>

      {/* 게시글 리스트 */}
      <div className="w-full flex flex-col items-start">
        {boards?.map((board: IBoardListRes) => (
          <div key={board.postId} className=" p-4 rounded-xl shadow-sm bg-white flex flex-col gap-2 w-full">
            {/* 1) editMode일 때만 체크박스 보이기 */}
            {editMode && (
              <input
                type="checkbox"
                checked={selectedIds.includes(board.postId)}
                onChange={() => toggleSelect(board.postId)}
                className="w-5 h-5"
              />
            )}

            <div className="flex">
              <div
                onClick={() => !editMode && navigate(`/board/detail/${board.boardType}/${board.postId}`)}
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
                <img src={RoomLike} alt="좋아요" className="w-5 h-5 object-contain" />
                <p className="text-md">{board.likeCount}</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={RoomComment} alt="댓글" className="w-5 h-5 object-contain" />
                <p className="text-md">{board.commentCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3) 필요하다면 선택된 항목 삭제 버튼 추가 */}
      {editMode && selectedIds.length > 0 && (
        <button
          type="button"
          onClick={() => handleDelete(selectedIds)}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
          선택 삭제 ({selectedIds.length})
        </button>
      )}
    </div>
  );
};
