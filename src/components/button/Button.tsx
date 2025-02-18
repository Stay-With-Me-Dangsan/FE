interface IProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button = (props: IProps) => {
  const { text, onClick, disabled } = props;

  return (
    <button
      className="w-full py-[24px] px-[20px] font-medium text-2xl text-active-text border-none rounded-xl bg-active-bg disabled:bg-disabled-bg disabled:text-disabled-text max-lg:py-[18px] max-lg:px-[16px]"
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
};
