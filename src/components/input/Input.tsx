import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface IProps {
  type: 'text' | 'email' | 'password' | 'date' | 'datetime-local';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  placeholder?: string;
  borderColor?: 'gray' | 'purple';
  optional?: boolean;
  children?: React.ReactNode;
}

export const Input = (props: IProps) => {
  const { type, value, onChange, className, name, placeholder, borderColor, optional = false, children } = props;

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
      name={name}
      className={`${isMobile ? 'py-[12px] px-[16px]' : 'py-[24px] px-[20px]'} ${border_color()} ${className} w-full`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={`${optional ? '[선택]' : ''} ${placeholder}`}
    />
  );
};
