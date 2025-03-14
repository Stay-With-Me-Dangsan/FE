import { useDeviceLayout } from '../../../hooks/useDeviceLayout';
import vector from '../../../asset/images/Vector.png';

interface IProps {
  children: React.ReactNode;
}

export const MypageLayout = (props: IProps) => {
  const { children } = props;

  const { isMobile } = useDeviceLayout();

  return (
    <div className="h-[100vh] flex justify-center overflow-x-hidden overflow-y-auto">
      <div
        className={`${isMobile ? '' : 'w-[20px] h-full bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]'}`}
      />
      <div
        className={`${isMobile ? 'w-full' : 'w-[80vw] px-10 pb-[50px]'} max-w-[960px] flex flex-col items-center overflow-y-auto`}>
        {children}

        <div className="w-full h-[222px] border-t-[1px] border-[#CDCDCD]">
          <div className="grid pt-[30px] gap-5">
            <div className=" justify-between">
              <p className="text-purple-400 font-bold ">스테이 윗 미</p>
            </div>
            <div className=" h-[222px] flex flex-col  gap-6">
              <div className="flex justify-between w-full">
                <p className="text-xl">내가 올린 집</p>
                <img src={vector} alt="vector" className="ml-auto" />
              </div>
              <div className="flex justify-between w-full">
                <p className="text-xl">내가 찜한 집</p>
                <img src={vector} alt="vector" className="ml-auto" />
              </div>
              <div className="flex justify-between w-full">
                <p className="text-xl">최근 조회한 집</p>
                <img src={vector} alt="vector" className="ml-auto" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[263px] border-t-[1px] border-[#CDCDCD] mt-[20px]">
          <div className="grid pt-[30px] gap-5">
            <div className=" justify-between">
              <p className="text-purple-400 font-bold ">게시판</p>
            </div>
            <div className=" h-[184px] flex flex-col gap-6">
              <div className="flex justify-between w-full">
                <p className="text-xl  ">내가 작성한 글</p>
                <img src={vector} alt="vector" />
              </div>
              <div className="flex justify-between w-full">
                <p className="text-xl  ">내가 작성한 댓글</p>
                <img src={vector} alt="vector" />
              </div>
              <div className="flex justify-between w-full">
                <p className="text-xl ">내가 찜한 게시글</p>
                <img src={vector} alt="vector" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${isMobile ? '' : 'w-[20px] h-full bg-gradient-to-l from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]'}`}
      />
    </div>
  );
};
