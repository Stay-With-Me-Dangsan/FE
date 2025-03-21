import { useEffect, useRef } from 'react';
import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface IProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  color?: 'gray' | 'green';
  optional?: boolean;
  children?: React.ReactNode;
}

const borderColor = {
  gray: 'border border-gray-300',
  green: 'border border-green-400',
};

export const Textarea = (props: IProps) => {
  const { value, onChange, className, name, placeholder = '', disabled, color = 'gray', optional = false } = props;

  const { isMobile } = useDeviceLayout();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    onChange(event);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '40vh';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      name={name}
      className={`${isMobile ? 'py-2 px-4' : 'py-3 px-5'} ${borderColor[color]} ${className} w-full max-h-[60vh] rounded-2xl resize-none`}
      value={value}
      onChange={handleInput}
      placeholder={`${optional ? '[선택] ' : ''}${placeholder}`}
      disabled={disabled}
    />
  );
};
