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
export const AdminLayout = (props: IProps) => {
  const { children } = props;
  const { isMobile } = useDeviceLayout();

  return (
    <div className="h-[100vh] flex justify-center overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-[960px] mx-auto flex flex-col items-center overflow-y-auto">
        {children}

        {/* 게시판 항목 */}
        <div className="w-full h-fit border-t-[1px] border-[#CDCDCD] mt-[20px]">
          <div className="grid pt-[30px] gap-5">
            <p className="text-purple-400 font-bold">게시판 및 게시글</p>
            <div className="flex flex-col gap-6">
              <MenuItem label="게시판 관리" to="/admin/board/list" />
              <MenuItem label="블라인드 된 게시글 리스트" to="/admin/blind/list" />
            </div>
          </div>
        </div>

        {/* 게시판 항목 */}
        <div className="w-full h-fit border-t-[1px] border-[#CDCDCD] mt-[20px]">
          <div className="grid pt-[30px] gap-5">
            <p className="text-purple-400 font-bold">유저 정보 및 차단 유저</p>
            <div className="flex flex-col gap-6">
              <MenuItem label="전체 회원 목록" to="/admin/user/list" />
              <MenuItem label="차단 회원 목록" to="/admin/black/list" />
            </div>
          </div>
        </div>

        {/* 공통코드드 항목 */}
        <div className="w-full h-fit border-t-[1px] border-[#CDCDCD] mt-[20px]">
          <div className="grid pt-[30px] gap-5">
            <p className="text-purple-400 font-bold">공통코드</p>
            <div className="flex flex-col gap-6">
              <MenuItem label="공통코드 관리리" to="/admin/code" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
