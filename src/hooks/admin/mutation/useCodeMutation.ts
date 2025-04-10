import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { IGetCodeDto, ICreateCodeDto, IPatchCodeDto } from '../../../types/dto/admin';
import commonCodeApi from '../../../api-url/admin/commonCode.api';

export default function useCodeMutation() {
  const navigate = useNavigate();

  const onGetCodeMutation = useMutation({
    mutationFn: (data: IGetCodeDto) => commonCodeApi.getCode(data),
  });

  const onCreateCodeMutation = useMutation({
    mutationFn: (data: ICreateCodeDto) => commonCodeApi.postCreate(data),
  });
  const onpatchCodeMutation = useMutation({
    mutationFn: (data: IPatchCodeDto) => commonCodeApi.patchCode(data),
  });

  const onDelteCodeMutation = useMutation({
    mutationFn: (deleteCode: number) => commonCodeApi.deleteCode(deleteCode),
  });

  return {
    onGetCodeMutation,
    onCreateCodeMutation,
    onpatchCodeMutation,
    onDelteCodeMutation,
  };
}
