import { useDeviceLayout } from '../../../hooks/useDeviceLayout';
import rightArrow from '../../../asset/images/rightArrow.png';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: React.ReactNode;
}
const MenuItem = ({ label, to }: { label: string; to: string }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-between w-full cursor-pointer hover:bg-gray-100 px-2 py-2 rounded"
      onClick={() => navigate(to)}>
      <p className="text-xl">{label}</p>
      <img src={rightArrow} alt="rightArrow" className="ml-auto" />
    </div>
  );
};
export const MypageLayout = (props: IProps) => {
  const { children } = props;
  const { isMobile } = useDeviceLayout();

  return (
    <div className="h-[100vh] flex justify-center overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-[960px] mx-auto flex flex-col items-center overflow-y-auto">
        {children}

        {/* 스테이 윗 미 항목 */}
        <div className="w-full h-fit border-t-[1px] border-[#CDCDCD] mt-[20px]">
          <div className="grid pt-[30px] gap-5">
            <p className="text-purple-400 font-bold">스테이 윗 미</p>
            <div className="flex flex-col gap-6">
              <MenuItem label="내가 올린 집" to="/mypage/house/upload" />
              <MenuItem label="내가 찜한 집" to="/mypage/house/like" />
              <MenuItem label="최근 조회한 집" to="/mypage/house/view" />
            </div>
          </div>
        </div>

        {/* 게시판 항목 */}
        <div className="w-full h-fit border-t-[1px] border-[#CDCDCD] mt-[20px]">
          <div className="grid pt-[30px] gap-5">
            <p className="text-purple-400 font-bold">게시판</p>
            <div className="flex flex-col gap-6">
              <MenuItem label="내가 작성한 글" to="/mypage/board/write" />
              <MenuItem label="내가 작성한 댓글" to="/mypage/board/comment" />
              <MenuItem label="내가 찜한 게시글" to="/mypage/borad/like" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
