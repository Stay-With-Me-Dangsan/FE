import { ResCodeEnum } from '../enum/res-code.enum';

export interface IResConfig<T> {
  message: string;
  result: ResCodeEnum;
  data: T;
}
