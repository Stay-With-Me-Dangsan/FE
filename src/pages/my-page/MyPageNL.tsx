import person from '../../asset/images/person.png';
import vector from '../../asset/images/Vector.png';
import { MypageLayout } from './components';
import { useNavigate } from 'react-router-dom';

export const MyPageNL = () => {
  const navigate = useNavigate();

  return (
    <>
      <MypageLayout>
        <div className="relative w-full flex flex-col items-center overflow-y-auto">
          <div className="w-full">
            <div className="w-full h-[208px] flex items-center">
              <div className="w-full flex py-5 gap-2">
                <div className="flex flex-col justify-center gap-2">
                  <img src={person} alt="person" width={116} />
                </div>

                <div className="w-full flex flex-col justify-center gap-2 ml-3">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2 text-2xl font-bold">로그인 후 확인 가능합니다다</div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <button onClick={() => navigate('/auth')}>
                    <img src={vector} alt="vector" className="ml-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MypageLayout>
    </>
  );
};
