import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface IProps {
  type: 'text' | 'email' | 'password' | 'date' | 'datetime-local';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  borderColor?: 'gray' | 'purple';
  optional?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  children?: React.ReactNode;
}

export const Input = (props: IProps) => {
  const {
    type,
    value,
    onChange,
    className,
    name,
    placeholder = '',
    disabled,
    borderColor,
    optional = false,
    ref,
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
    <input
      ref={ref}
      name={name}
      className={`${isMobile ? 'py-2 px-4' : 'py-3 px-5'} ${border_color()} ${className} w-full`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={`${optional ? '[선택] ' : ''}${placeholder}`}
      disabled={disabled}
    />
  );
};
