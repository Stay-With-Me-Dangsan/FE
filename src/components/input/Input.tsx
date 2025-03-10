import { useDeviceLayout } from '../../hooks/useDeviceLayout';
import { ConfirmSvg } from '../../asset/svg';

interface IProps {
  type: 'text' | 'email' | 'password' | 'date' | 'datetime-local';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  color?: 'gray' | 'purple';
  optional?: boolean;
  className?: string;
  isConfirm?: boolean;
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const borderColor = {
  gray: 'border border-gray-300',
  purple: 'border border-[#9470DC]',
};

export const Input = (props: IProps) => {
  const {
    type,
    value,
    onChange,
    name,
    placeholder = '',
    disabled,
    color = 'gray',
    optional = false,
    className,
    isConfirm,
    onClick,
  } = props;

  const { isMobile } = useDeviceLayout();

  return (
    <div className="relative flex items-center">
      <input
        name={name}
        className={` w-full ${isMobile ? 'py-2 px-4' : 'py-3 px-5'} ${borderColor[color]} ${isConfirm ? 'pr-10' : ''} ${className}`}
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
