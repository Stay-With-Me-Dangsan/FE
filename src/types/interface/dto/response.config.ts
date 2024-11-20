import { ResponseCodeEnum } from '@/types/enum/dto';

export interface ResponseConfig<T> {
  message: string;
  result: ResponseCodeEnum;
  data: T;
}
