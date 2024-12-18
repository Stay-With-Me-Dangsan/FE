interface IProps {
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const Input = ({ type, value, onChange, placeholder }: IProps) => {
  return (
    <input
      className="w-full pt-[24px] pb-[24px] pr-[20px] pl-[20px] font-normal text-2xl border-[1px] border-input-border rounded-xl"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
