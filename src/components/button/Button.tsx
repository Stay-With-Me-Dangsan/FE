import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface IProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: 'gray' | 'purple';
  disabled?: boolean;
  className?: string;
}

const buttonColor = {
  gray: 'bg-gray-300 text-white hover:bg-gray-400',
  purple: 'bg-[#9470DC] text-white hover:bg-[#9470DC]',
};

export const Button = (props: IProps) => {
  const { text, onClick, color = 'gray', disabled, className } = props;

  const { isMobile } = useDeviceLayout();

  return (
    <button
      className={`w-full ${isMobile ? 'py-2 px-4' : 'py-3 px-5'} ${buttonColor[color]} ${className}`}
      onClick={(event) => onClick(event)}
      disabled={disabled}
      name={text}>
      <p className="whitespace-nowrap">{text}</p>
    </button>
  );
};
