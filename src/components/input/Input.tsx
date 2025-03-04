import { useDeviceLayout } from '../../hooks/useDeviceLayout';
import { ConfirmSvg } from '../../asset/svg';

interface IProps {
  type: 'text' | 'email' | 'password' | 'date' | 'datetime-local';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  borderColor?: 'gray' | 'purple';
  optional?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  className?: string;
  isConfirm?: boolean;
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

export const Input = (props: IProps) => {
  const {
    type,
    value,
    onChange,
    name,
    placeholder = '',
    disabled,
    borderColor,
    optional = false,
    ref,
    className,
    isConfirm,
    onClick,
    children,
  } = props;

  const { isMobile } = useDeviceLayout();

  const border_color = () => {
    switch (borderColor) {
      case 'gray':
        return 'border border-gray-300';
      case 'purple':
        return 'border border-[#9470DC]';
      default:
        return 'border border-gray-300';
    }
  };

  return (
    <div className="relative flex items-center">
      <input
        ref={ref}
        name={name}
        className={` w-full ${isMobile ? 'py-2 px-4' : 'py-3 px-5'} ${border_color()} ${isConfirm ? 'pr-10' : ''} ${className}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={`${optional ? '[선택] ' : ''}${placeholder}`}
        disabled={disabled}
      />
      {isConfirm && <ConfirmSvg className="absolute right-2" color="#989898" onClick={onClick} />}
    </div>
  );
};
