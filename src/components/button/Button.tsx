import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface IProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button = (props: IProps) => {
  const { text, onClick, disabled } = props;

  const { width } = useDeviceLayout();

  return (
    <button
      className={`${width < 768 ? 'py-[12px] px-[16px]' : 'py-[24px] px-[20px]'} w-full font-medium text-active-text border-none rounded-xl  bg-active-bg disabled:bg-disabled-bg disabled:text-disabled-text`}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
};
