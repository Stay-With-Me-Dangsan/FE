import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UsersDto } from '../../types/dto/admin/admin.dto';
import { useAllUsersQuery } from '../../hooks/admin/query/useUserListQuery';
import person from '../../asset/images/person.png';
import { Alert } from '../../components/popup';

export const AdminUserDetail = () => {
  const { userId } = useParams();
  const [user, setuser] = useState<UsersDto[]>([]);
  const { data, isError } = useAllUsersQuery();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };

  useEffect(() => {
    if (data) {
      setuser(data);
    }
    if (isError) {
      showAlert('회원 리스트를 불러오는 데 실패했습니다.');
    }
  }, [data, isError]);

  if (!user) return <p>유저 정보를 불러오는 중...</p>;

  return (
    <>
      <div className="relative w-full flex flex-col items-center overflow-y-auto">
        <div className="w-full">
          <div className="w-full h-[208px] flex items-center">
            <div className="w-full flex py-5 gap-2">
              <div className="flex flex-col justify-center gap-2">
                <img src={person} alt="person" width={116} />
              </div>

              <div className="w-full flex flex-col justify-center gap-2 ml-3">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2 text-2xl font-bold">
                    <p>{}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-gray-500">{}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
    </>
  );
};
