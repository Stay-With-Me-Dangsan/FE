interface IProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button = ({ text, onClick, disabled }: IProps) => {
  return (
    <button
      className="w-full pt-[24px] pb-[24px] pr-[20px] pl-[20px] font-medium text-2xl text-active-text border-none bg-active-bg disabled:bg-disabled-bg disabled:text-disabled-text rounded-xl"
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
};
