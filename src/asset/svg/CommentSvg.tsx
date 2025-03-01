import { ISvgProps } from './interface';
import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface IProps extends ISvgProps {}

export const CommentSvg = (props: IProps) => {
  const { color, onClick, className } = props;
  const { isMobile } = useDeviceLayout();

  return (
    <svg
      width={isMobile ? '22' : '30'}
      height={isMobile ? '22' : '30'}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}>
      <path
        d="M6.99935 24C4.60611 24 2.66602 22.0599 2.66602 19.6667V8.33333C2.66602 5.94009 4.60611 4 6.99935 4H24.9993C27.3925 4 29.3327 5.94009 29.3327 8.33333V19.6667C29.3327 22.0599 27.3925 24 24.9993 24H17.3493L10.6643 29.0009C9.92715 29.5523 8.88268 29.4016 8.33136 28.6645C8.11583 28.3763 7.99935 28.0261 7.99935 27.6665L7.9983 24H6.99935ZM16.684 22H24.9993C26.288 22 27.3327 20.9553 27.3327 19.6667V8.33333C27.3327 7.04467 26.288 6 24.9993 6H6.99935C5.71068 6 4.66602 7.04467 4.66602 8.33333V19.6667C4.66602 20.9553 5.71068 22 6.99935 22H9.99774L9.99802 22.9997L9.99916 27.0008L16.684 22Z"
        fill="#212121"
      />
    </svg>
  );
};
