import { useQuery } from '@tanstack/react-query';
import AdminApi from '../../../api-url/admin/admin.api';
import { UsersDto } from '../../../types/dto/admin';
export const useAllUsersQuery = () => {
  return useQuery({
    queryKey: ['all-users'],
    queryFn: () => AdminApi.getAdminUserList(),
    select: (res) => res.data.data.result as UsersDto[],
  });
};
