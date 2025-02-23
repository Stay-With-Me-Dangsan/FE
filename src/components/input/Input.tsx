import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface IProps {
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  borderColor?: 'gray' | 'purple';
  children?: React.ReactNode;
}

export const Input = (props: IProps) => {
  const { type, value, onChange, placeholder, borderColor, children } = props;

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
      className={`${isMobile ? 'py-[12px] px-[16px]' : 'py-[24px] px-[20px]'} ${border_color()} w-full`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
