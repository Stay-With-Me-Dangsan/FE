import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface IProps {
  value: string;
  color: 'gray' | 'black' | 'red' | 'purple';
  id?: string;
  size?: 'small' | 'base' | 'large';
  onClick?: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  className?: string;
}

const textColor = {
  gray: 'text-[#989898]',
  black: 'text-black',
  red: 'text-red-400',
  purple: 'text-[#9470DC]',
};

const textSize = {
  small: 'text-sm',
  base: 'text-base',
  large: 'text-xl',
};

export const Text = (props: IProps) => {
  const { value, color, id, size = 'base', onClick, className } = props;

  const { isMobile } = useDeviceLayout();

  return (
    <p
      className={`${textColor[color]} ${textSize[size]} ${onClick && 'cursor-pointer'} ${className}`}
      id={id}
      onClick={(event) => onClick && onClick(event)}
      style={{ wordBreak: 'break-word' }}>
      {value}
    </p>
  );
};
