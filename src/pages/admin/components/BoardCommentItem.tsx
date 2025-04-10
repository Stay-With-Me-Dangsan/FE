import { IBoardComments } from '../../../types/interface/board/board.model';
import { getTimeAgo } from '../../../components/time/getTimeAgo';

interface BoardItemProps {
  comment: IBoardComments;
}

export const BoardCommentItem = ({ comment }: BoardItemProps) => {
  return (
    <div className="w-full pb-10 border-b-[1px] border-[#CDCDCD]">
      <div className="flex py-4">
        <p className="text-2xl font-bold text-gray-400">{comment.comments}</p>
      </div>
      <div className=" bg-gray-200 rounded-[10px] mx-auto p-6 leading-10">
        <div className="flex-1 pr-4">
          <p className="text-1xl truncate overflow-hidden whitespace-nowrap max-w-full">{comment.title}</p>
        </div>
        <div className="">
          <p className="text-gray-400">{getTimeAgo(comment.comment_date)}</p>
        </div>
      </div>
    </div>
  );
};
