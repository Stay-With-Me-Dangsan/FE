import { useQuery } from '@tanstack/react-query';
import commonCodeApi from '../../../api-url/admin/commonCode.api';
import { CommonCode } from '../../../types/dto/admin';

export const useCodeQuery = () => {
  return useQuery<CommonCode[]>({
    queryKey: ['adminCodes'],
    queryFn: async () => {
      const res = await commonCodeApi.getCodeList();
      return res.data.data.result;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

// export const useCodeQuery = (params: IGetCodeDto) => {
//   return useQuery<CommonCode[]>({
//     queryKey: ['adminCodes', params],
//     queryFn: async () => {
//       const res = await commonCodeApi.getCode(params);
//       return res.data.data.result;
//     },
//     staleTime: 1000 * 60 * 5,
//     refetchOnWindowFocus: false,
//   });
// };
