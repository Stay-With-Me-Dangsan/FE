interface IProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button = (props: IProps) => {
  const { text, onClick, disabled } = props;

  return (
    <button
      className="w-full py-[24px] px-[20px] font-medium text-2xl text-active-text border-none bg-active-bg disabled:bg-disabled-bg disabled:text-disabled-text rounded-xl"
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
};
