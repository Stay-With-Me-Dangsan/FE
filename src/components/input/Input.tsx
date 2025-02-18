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

  const { width } = useDeviceLayout();

  const border_color = () => {
    switch (borderColor) {
      case 'gray':
        return '#CDCDCD';
      case 'purple':
        return '#9470DC';
      default:
        return '#CDCDCD';
    }
  };

  return (
    <input
      className="w-full py-[24px] px-[20px] font-normal  border-[1px] rounded-xl cursor-pointer max-lg:py-[12px] max-lg:px-[16px]"
      style={{ borderColor: border_color() }}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
