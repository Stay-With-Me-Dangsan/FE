import { useEffect, useState } from 'react';
import axios from 'axios';
import { IBoard } from '../../types/interface/board/board.model';
import { BoardItem } from '../my-page/components/BoardItem';
import { BoardSection } from './components/BoardSection';
import myapge_list from '../../asset/images/myapge_list.png';
export const AdminUserDetail = () => {
  const [boards, setBoards] = useState<IBoard[]>([]);

  useEffect(() => {
    // const fetchMyComments = async () => {
    //   try {
    //     const res = await axios.get('/api/mypage/board/comment'); // ← 백엔드 API 경로에 맞춰 수정
    //     setBoards(res.data.data); // ← 응답 구조에 맞게 수정
    //   } catch (err) {
    //     console.error('댓글 단 글 불러오기 실패', err);
    //   }
    // };

    // fetchMyComments();
    const mockBoards: IBoard[] = [
      {
        id: 1,
        title: '쉐어하우스 계약하기 전 확인해야할 팁 모음',
        content: '다년간의 쉐어메이트 계약 인생...모으고 모았던 팁 뿌릴게',
        likes: 29,
        comments: 2,
        image: '',
      },
      {
        id: 2,
        title: '아 윗집 소음 좀',
        content: '체르니 40 그만 좀 쳐라 밤11시 넘었다고 이자식아',
        likes: 11,
        comments: 3,
        thumbnail: '../../../assets/images/room1.png',
        image: '',
      },
      {
        id: 3,
        title: '쇼파 추천 좀요요',
        content: '집에 쇼파를 들여볼까하는데 모르겠더',
        likes: 24,
        comments: 15,
        thumbnail: '../../../assets/images/room1.png',
        image: '',
      },
    ];

    setBoards(mockBoards);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-4 px-4 py-8">
      <div className="w-full h-[54px] inline-flex items-center py-10">
        <div className="w-full flex justify-start gap-1 ">
          <div className="float-left flex">
            <p>총 5개</p>
            {/* <p>총 {boards.length}개</p> */}
          </div>
        </div>
        <div className="float-right content-center">
          <h1>
            <img src={myapge_list} alt="myapge_list" />
          </h1>
        </div>
      </div>
      {/* <BoardSection title="내가 작성한 글" boards={boards} comments={[]}/> */}
      {boards.map((board) => (
        <BoardItem key={board.id} board={board} />
      ))}
    </div>
  );
};
