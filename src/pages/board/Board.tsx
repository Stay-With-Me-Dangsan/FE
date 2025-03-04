import { useState } from 'react';
import { Search, Heart, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDeviceLayout } from '../../hooks/useDeviceLayout';
import { BoardRegisterButton } from '../../asset/svg';

export const Board = () => {
  const navigate = useNavigate();

  const { isMobile } = useDeviceLayout();

  const [activeTab, setActiveTab] = useState('자유게시판');

  const tabs = ['자유게시판', '정보게시판', '질문게시판', '호스트게시판', '세입자게시판'];

  const onClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    navigate('/board/detail');
  };

  return (
    <div>
      <div className="bg-gray-50 flex flex-col items-center">
        {/* 상단 네비게이션 바 */}
        <div className="w-[960px] h-[100px] flex items-center justify-between px-4 border-b relative">
          {/* 게시판 제목 */}
          <h1 className="text-purple-600 text-3xl font-extrabold">게시판</h1>

          {/* 검색 아이콘 */}
          <Search className="text-purple-600 w-6 h-6 cursor-pointer" />
        </div>

        {/* 구분선 */}
        <div className="w-[958px] h-[8px] bg-gray-200" />

        {/* 탭 네비게이션 */}
        <div className="w-[960px] h-[54px] flex items-center pl-6 space-x-14 text-lg font-semibold tracking-wide mt-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 ${
                activeTab === tab
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        {/* 선택된 탭 내용 */}
        <div className="w-[960px] p-4">
          {/* 게시글 카드 예시 */}
          <div className="w-[880px] bg-white shadow-md rounded-lg p-4 flex justify-between mt-4 border-b">
            <div className="flex-1 pr-6">
              {' '}
              {/* 오른쪽 여백 추가 */}
              <h3 className="text-lg font-bold">게시글 제목</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mt-2">게시글 내용 미리보기.</p>
              <div className="flex items-center mt-4 space-x-4 text-gray-500">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" /> <span>51</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" /> <span>5</span>
                </div>
              </div>
            </div>
            {/* 이미지 크기 조정 */}
            <div className="w-[150px] h-[150px] bg-gray-300 rounded-lg" />
          </div>
        </div>
      </div>

      <div className={`${isMobile ? 'bottom-24' : 'bottom-36'} absolute right-4`}>
        <BoardRegisterButton color="#9470DC" onClick={onClickHandler} />
      </div>
    </div>
  );
};
