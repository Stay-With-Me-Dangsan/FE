import { useEffect, useState } from 'react';
import mypage_comment_drop from '../../asset/images/mypage_comment_drop.png';
import { UsersDto } from '../../types/dto/admin/admin.dto';
import admin_userList from '../../asset/images/admin_userList.png';
import { useAllUsersQuery } from '../../hooks/admin/query/useUserListQuery';
import { Alert } from '../../components/popup';
const sortOptions = ['최신순', '오래된순', '많이본순'];

export const AdminUserList = () => {
  const [users, setusers] = useState<UsersDto[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { data, isLoading, isError } = useAllUsersQuery();

  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };

  // 🔹 data 수신 후 users 상태 업데이트
  useEffect(() => {
    if (data) {
      setusers(data); // select에서 result만 꺼낸 상태라면 그대로 사용 가능
    }
    if (isError) {
      showAlert('회원 리스트를 불러오는 데 실패했습니다.');
    }
  }, [data, isError]);

  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    setIsOpen(false);
    const sorted = [...users];
    if (option === '최신순')
      sorted.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    if (option === '오래된순')
      sorted.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
    setusers(sorted);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full h-full px-8">
        <div className=""></div>
        <div className="w-full inline-flex items-center py-6">
          <div className="">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center w-30 gap-4 px-3 py-3 border border-gray-300 rounded-md text-md bg-gray-200 ">
              <span>{selectedSort}</span>
              <img src={mypage_comment_drop} alt="dropdown" className="w-4 h-4" />
            </button>

            {isOpen && (
              <div className="absolute z-10 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-md">
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSortSelect(option)}>
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          {users.length === 0 ? (
            <p className="text-gray-500">등록된 유저가 없습니다.</p>
          ) : (
            users.map((user) => (
              <div key={user.user_id} className="w-full border-b py-4 flex justify-between items-center">
                <div className="flex items-center">
                  <img src={admin_userList} alt="어드민_유저리스트" />
                  <div className="justify-between items-center ml-1">
                    <p className="font-semibold">{user.nickname || '이름 없음'}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">가입일: {new Date(user.createdDate).toLocaleDateString()}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
