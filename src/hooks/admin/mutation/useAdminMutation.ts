import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { IGetCodeDto, ICreateCodeDto, IPatchCodeDto, UsersDto } from '../../../types/dto/admin';
import AdminApi from '../../../api-url/admin/admin.api';

export default function useAdminMutation() {
  const navigate = useNavigate();

  const onGetCodeMutation = useMutation({
    mutationFn: (data: IGetCodeDto) => AdminApi.getCode(data),
  });

  const onCreateCodeMutation = useMutation({
    mutationFn: (data: ICreateCodeDto) => AdminApi.postCreate(data),
  });
  const onpatchCodeMutation = useMutation({
    mutationFn: (data: IPatchCodeDto) => AdminApi.patchCode(data),
  });

  const onDelteCodeMutation = useMutation({
    mutationFn: (deleteCode: number) => AdminApi.deleteCode(deleteCode),
  });

  const getUserListMutation = useMutation({
    mutationFn: () => AdminApi.getAdminUserList(),
  });

  const getAdminBoardListMutation = useMutation({
    mutationFn: (category: string) => AdminApi.getAdminBoardList(category),
  });

  const onpatchBoardBlindMutatiion = useMutation({
    mutationFn: (selectedIds: number[]) => AdminApi.updateBoardBlind(selectedIds),
  });

  return {
    onGetCodeMutation,
    onCreateCodeMutation,
    onpatchCodeMutation,
    onDelteCodeMutation,
    getUserListMutation,
    getAdminBoardListMutation,
    onpatchBoardBlindMutatiion,
  };
}
