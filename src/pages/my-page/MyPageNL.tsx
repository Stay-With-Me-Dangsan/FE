import { useEffect } from 'react';
import person from '../../asset/images/person.png';
import vector from '../../asset/images/Vector.png';
import { Link } from 'react-router-dom';

export const MyPageNL = () => {
  useEffect(() => {});

  return (
    <div className="h-[987px] flex justify-center items-center overflow-y-hidden">
      <div className="w-[20px] h-full bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]" />
      <div className="relative  w-[960px] h-full px-[40px] flex flex-col items-center overflow-y-auto">
        <div className="w-full h-[100px] flex items-center  px-10">
          <p className="text-3xl text-purple-300 font-bold ">마이페이지 </p>
        </div>

        <div className="w-[960px] h-2 bg-[#f0f0f0] mt-2" />
        <div className="w-full px-10">
          <div className="w-full h-[208px] flex justify-between items-center py-5">
            <div className="flex items-center  h-[116px] space-x-4">
              <img src={person} alt="person" width={116} />
              <h1 className="text-2xl font-bold">로그인 후 확인 가능합니다</h1>
            </div>

            <Link to={'/auth'}>
              <img src={vector} alt="vector" width={12} height={28} />
            </Link>
          </div>

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
      </div>
      <div className="w-[20px] h-full bg-gradient-to-l from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]" />
    </div>
  );
};
