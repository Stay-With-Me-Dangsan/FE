import { useCallback } from 'react';

interface IProps {
  value: string;
  color: 'gray' | 'black';
}

export const Text = ({ value, color }: IProps) => {
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

  return <p className={`${textColor()} font-normal text-xl`}>{value}</p>;
};
