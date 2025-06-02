import { useQuery } from '@tanstack/react-query';
import AdminApi from '../../../api-url/admin/admin.api';
import { UsersDto } from '../../../types/dto/admin';
export const useUserDetailQuery = (userId: number) => {
  return useQuery({
    queryKey: ['user-detail', userId],
    queryFn: () => AdminApi.getAdminUserDetail(userId),
    enabled: !!userId, // userId 없을 때는 실행 X
    select: (res) => res.data.data.result as UsersDto, // 단일 유저
  });
};
