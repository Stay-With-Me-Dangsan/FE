import { useDeviceLayout } from '../../hooks/useDeviceLayout';
import { Link } from 'react-router-dom';

interface IProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: 'gray' | 'purple';
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  to?: string;
  isValid?: boolean;
}

export const AuthButton = (props: IProps) => {
  const { text, disabled = false, type, to, isValid = true, onClick, className } = props;

  const { isMobile } = useDeviceLayout();

  const style = () => {
    return disabled || !isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#9470DC] text-white hover:bg-gray-400';
  };

  if (to) {
    return (
      <div className="relative w-full">
        <div className="w-full absolute bottom-0">
          <Link
            to={to}
            className={`py-3 px-5 ${style()} w-full p-2 text-white rounded mt-4 transition-colors flex justify-center items-center`}>
            <button type="button" disabled={!isValid} onClick={onClick}>
              {text}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="w-full absolute">
        <button
          type={type}
          className={`py-3 px-5 ${style()} w-full p-2 text-white rounded mt-4 transition-colors`}
          disabled={!isValid}
          onClick={onClick}>
          {text}
        </button>
      </div>
    </div>
  );
};
