import { useNavigate } from 'react-router-dom';
import { Text } from '../../components/text';
import { MypageLayout } from '../admin/components';
import { useEffect } from 'react';

export const Admin = () => {
  const navigate = useNavigate();
  const onClickHandler = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    e.stopPropagation();

    const id = e.currentTarget.id;

    switch (id) {
      case 'userList':
        navigate('/admin/user/list');
        break;
      case 'blackList':
        navigate('/admin/black/list');
        break;
      case 'code':
        navigate('/admin/code');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <MypageLayout>
        <div className="relative w-full flex flex-col items-center overflow-y-auto">
          <div className="w-full">
            <div className="w-full h-[208px] flex items-center">
              <div className="w-full flex py-5 gap-2">
                <div className="w-full flex justify-center gap-10">
                  <Text value="유저 리스트" color="gray" id="userList" onClick={onClickHandler} />
                  <Text value="블랙 리스트" color="gray" id="blackList" onClick={onClickHandler} />
                  <Text value="공통 코드 관리" color="gray" id="code" onClick={onClickHandler} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MypageLayout>
    </>
  );
};
