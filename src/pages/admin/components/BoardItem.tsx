import RoomBookMark from '../../../asset/images/RoomBookMark.png';
import RoomComment from '../../../asset/images/RoomComment.png';
import RoomLike from '../../../asset/images/RoomLike.png';
import { IBoard } from '../../../types/interface/board/board.model';

interface BoardItemProps {
  board: IBoard;
}

export const BoardItem = ({ board }: BoardItemProps) => {
  return (
    <div className="w-full h-[222px] border-b-[1px] border-[#CDCDCD]">
      <div className="w-full h-[164px] inline-grid">
        <div className="flex">
          <p className="text-2xl font-bold ">{board.title}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex-1 pr-4">
            <p className="text-1xl truncate overflow-hidden whitespace-nowrap max-w-full">{board.content}</p>
          </div>
          {board.thumbnail && (
            <div className="float-right">
              <img src={board.thumbnail} alt="thumbnail" className="w-[100px] h-[100px] object-cover" />
            </div>
          )}
        </div>
        <div className="flex">
          <div className="flex gap-5 mt-2">
            <div className="flex items-center gap-1">
              <img src={RoomLike} alt="좋아요" className="w-5 h-5 object-contain" />
              <p className="text-sm">{board.likes}</p>
            </div>
            <div className="flex items-center gap-1">
              <img src={RoomComment} alt="댓글" className="w-5 h-5 object-contain" />
              <p className="text-sm">{board.comments}</p>
            </div>
            <div className="flex items-center gap-1">
              <img src={RoomBookMark} alt="북마크" className="w-5 h-5 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
