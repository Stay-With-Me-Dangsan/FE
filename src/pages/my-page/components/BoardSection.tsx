import { BoardItem } from './BoardItem';
import { BoardCommentItem } from './BoardCommentItem';
import { IBoard, IBoardComments } from '../../../types/interface/board/board.model';

interface IBoardSectionProps {
  title: string;
  boards: IBoard[];
  comments: IBoardComments[];
}

export const BoardSection = ({ title, boards = [], comments = [] }: IBoardSectionProps) => {
  return (
    <div className="w-full mt-10">
      <p className="text-2xl font-bold mb-4">{title}</p>
      {/* {boards.map((board) => (
        <BoardItem key={board.id} board={board} />
      ))} */}

      {/* 글일 경우 */}
      {boards.length > 0 && boards.map((board) => <BoardItem key={board.id} board={board} />)}

      {/* 댓글일 경우 */}
      {comments.length > 0 && comments.map((comment) => <BoardCommentItem key={comment.id} comment={comment} />)}
    </div>
  );
};
