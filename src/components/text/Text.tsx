import { useCallback } from 'react';

interface IProps {
  value: string;
  color: 'gray' | 'black';
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
}

export const Text = (props: IProps) => {
  const { value, color, id, onClick } = props;

  const textColor = useCallback(() => {
    switch (color) {
      case 'gray':
        return 'text-[#989898]';
      case 'black':
        return 'text-black';
      default:
        return 'text-black';
    }
  }, []);

  return (
    <p
      className={`${textColor()} ${onClick && 'cursor-pointer'} font-normal text-xl whitespace-nowrap`}
      id={id}
      onClick={(event) => onClick && onClick(event)}>
      {value}
    </p>
  );
};
