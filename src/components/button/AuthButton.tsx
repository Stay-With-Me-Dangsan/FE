import { useDeviceLayout } from '../../hooks/useDeviceLayout';
import { Link } from 'react-router-dom';

interface IProps {
  text: string;
  // onClick?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: 'gray' | 'purple';
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  isSubmitting?: boolean;
  to?: string;
}

export const AuthButton = (props: IProps) => {
  const { text, onClick, color = 'gray', disabled = false, type = 'button', isSubmitting = false, to } = props;

  const { isMobile } = useDeviceLayout();

  const style = () => {
    if (disabled || isSubmitting) {
      return 'bg-gray-400 cursor-not-allowed';
    }
    return color === 'purple'
      ? 'bg-[#9470DC] text-white hover:bg-[#9470DC]'
      : 'bg-gray-300 text-white hover:bg-gray-400';
    // switch (color) {
    //   case 'gray':
    //     return 'bg-gray-300 text-white hover:bg-gray-400';
    //   case 'purple':
    //     return 'bg-[#9470DC] text-white hover:bg-[#9470DC]';
    //   default:
    //     return 'bg-gray-300 text-white';
    // }
  };
  if (to) {
    return (
      <div className="w-full absolute bottom-0">
        <button>
          <Link
            to={to}
            className={`py-3 px-5 ${style()} w-full p-2 text-white rounded mt-4 transition-colors flex justify-center items-center`}>
            {text}
          </Link>
        </button>
      </div>
    );
  }

  return (
    <div className={`${isMobile ? 'w-auto absolute bottom-0' : 'w-full absolute bottom-0'}`}>
      <button
        type={type}
        className={`py-3 px-5 ${style()} w-full p-2 text-white rounded mt-4 transition-colors`}
        onClick={type === 'button' ? onClick : undefined}
        disabled={disabled || isSubmitting}>
        {isSubmitting ? '처리 중...' : text}
      </button>
    </div>
  );
};
