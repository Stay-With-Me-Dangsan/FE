import { useState } from 'react';
import { useGetBoardCommentsQuery } from '../../hooks/mypage/query';

import { IBoardComments } from '../../types/dto/board';
import { getTimeAgo } from '../../components/time/getTimeAgo';

import mypage_comment_drop from '../../asset/images/mypage_comment_drop.png';

const sortOptions = ['최신순', '오래된순', '많이본순'];

export const MyPageBoardComment = () => {
  const { data: comments = [] } = useGetBoardCommentsQuery();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('최신순');

  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    setIsOpen(false);
    // TODO: 정렬된 comments 갱신 로직 추가 가능
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full h-full px-8">
        <div className="w-full inline-flex items-center py-6">
          <div className="relative">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center w-28 gap-4 px-3 py-3 border border-gray-300 rounded-md text-md bg-gray-200 ">
              <span>{selectedSort}</span>
              <img src={mypage_comment_drop} alt="dropdown" className="w-4 h-4" />
            </button>

            {isOpen && (
              <div className="absolute z-10 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-md">
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSortSelect(option)}>
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {comments.map((comment: IBoardComments) => (
          <div className="w-full pb-10 border-b-[1px] border-[#CDCDCD]">
            <div className="flex py-4">
              <p className="text-2xl font-bold text-gray-400">{comment.title}</p>
            </div>
            <div className=" bg-gray-200 rounded-[10px] mx-auto p-6 leading-10">
              <div className="">
                <p className="text-400">{comment.content}</p>
                <p className="text-gray-400">{getTimeAgo(comment.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
