interface IProps {
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  borderColor?: 'gray' | 'purple';
}

export const Input = ({ type, value, onChange, placeholder, borderColor }: IProps) => {
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
      className="w-full py-[24px] px-[20px] font-normal text-2xl border-[1px] rounded-xl"
      style={{ borderColor: border_color() }}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
