import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface IProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: 'gray' | 'purple';
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Button = (props: IProps) => {
  const { text, onClick, color = 'gray', disabled, children } = props;

  const { isMobile } = useDeviceLayout();

  const style = () => {
    switch (color) {
      case 'gray':
        return 'bg-gray-300 text-white hover:bg-gray-400';
      case 'purple':
        return 'bg-[#9470DC] text-white hover:bg-[#9470DC]';
      default:
        return 'bg-gray-300 text-white';
    }
  };

  return (
    <button
      className={`${isMobile ? 'py-[12px] px-[16px]' : 'py-[24px] px-[20px]'} ${style()} w-full`}
      onClick={(event) => onClick(event)}
      disabled={disabled}>
      <p className="whitespace-nowrap">{text}</p>
    </button>
  );
};
