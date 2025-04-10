import { ResCodeEnum } from '../constant/enum/res-code.enum';

export interface IResConfig<T> {
  code: ResCodeEnum;
  message: string;
  data: {
    result: T;
  };
}
