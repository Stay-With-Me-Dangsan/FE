import { useQuery } from '@tanstack/react-query';
import AdminApi from '../../../api-url/admin/admin.api';
import { IBoardListRes } from '../../../types/dto/admin';

export const useBoardListQuery = (category: string) => {
  return useQuery<IBoardListRes[], Error>({
    queryKey: ['adminBoards', category],
    queryFn: async () => {
      const res = await AdminApi.getAdminBoardList(category);
      return res.data.data.result;
    },
    enabled: Boolean(category),
  });
};
