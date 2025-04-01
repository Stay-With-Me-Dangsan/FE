import { useEffect, useState } from 'react';
import axios from 'axios';
import { IBoardComments } from '../../types/interface/board/board.model';
import { BoardCommentItem } from '../../pages/my-page/components/BoardCommentItem';
import { BoardSection } from './components/BoardSection';
import myapge_list from '../../asset/images/myapge_list.png';
import mypage_comment_drop from '../../asset/images/mypage_comment_drop.png';

const sortOptions = ['최신순', '오래된순', '많이본순'];

export const MyPageBoardComment = () => {
  const [comments, setcomments] = useState<IBoardComments[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('최신순');

  useEffect(() => {
    // const fetchMyComments = async () => {
    //   try {
    //     const res = await axios.get('/api/mypage/board/comment'); // ← 백엔드 API 경로에 맞춰 수정
    //     setcomments(res.data.data); // ← 응답 구조에 맞게 수정
    //   } catch (err) {
    //     console.error('댓글 단 글 불러오기 실패', err);
    //   }
    // };

    // fetchMyComments();
    const mockComments: IBoardComments[] = [
      {
        id: 1,
        title:
          '쉐어하우스 계약하기 전 확인해야 할 팁 모음 다년간의 쉐어메이트 계약 인생... 모으고 모았던 팁 뿌릴게 ... 더보기 ',
        comments: 'ㅇㄷ',
        comment_date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전
      },
      {
        id: 2,
        title:
          '야밤에 냉동만두에 와인 한 잔을 하면서 제 자취생활 동안 얻게 된 요리 팁을 대방출하고자 합니다. ... 더보기',
        comments: '닭볶음탕 집에서 쉽게 하는 법도 부탁드립니다ㅠㅠ',
        comment_date: new Date(Date.now() - 60 * 1000), // 1분 전
      },
      {
        id: 3,
        title: '쇼파 추천 좀요요',
        comments:
          '오늘의 집에서 3d방오늘의집에서 3D로 방 구현해가지고 인테리어 비치 미리 해보는 시뮬레이션 기능 있으니까 그거 참고해보세요 무료 프로그램이라서 돈 따로 내지 않아도 돼요',
        comment_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3일 전
      },
    ];

    setcomments(mockComments);
  }, []);
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
        {/* <BoardSection title="내가 작성한 댓댓글" comments={comments} boards={[]} /> */}
        {comments.map((comment) => (
          <BoardCommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
