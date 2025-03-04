import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface IProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: 'gray' | 'purple';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Button = (props: IProps) => {
  const { text, onClick, color = 'gray', disabled, className, children } = props;

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
      className={`w-full ${isMobile ? 'py-2 px-4' : 'py-3 px-5'} ${style()} ${className} ${children}`}
      onClick={(event) => onClick(event)}
      disabled={disabled}
      name={text}>
      <p className="whitespace-nowrap">{text}</p>
    </button>
  );
};
