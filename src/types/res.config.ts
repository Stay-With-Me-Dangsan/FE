import { ResCodeEnum } from '../constant/enum/res-code.enum';

export interface IResConfig<T> {
  message: string;
  result: ResCodeEnum;
  data: T;
}
