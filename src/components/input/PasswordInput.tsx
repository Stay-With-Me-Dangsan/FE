import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface PasswordInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  borderColor?: 'gray' | 'purple';
}

export const PasswordInput = ({
  value,
  onChange,
  placeholder = '비밀번호 입력',
  className,
  errorMessage,
  borderColor = 'gray',
}: PasswordInputProps) => {
  const { isMobile } = useDeviceLayout();
  const [showPassword, setShowPassword] = useState(false);

  const border_color = errorMessage
    ? 'border-red-500'
    : borderColor === 'purple'
      ? 'border-purple-500'
      : 'border-gray-300';

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${isMobile ? 'py-2' : 'py-6 px-4'} w-full my-2 border-2 rounded-2
          ${border_color} ${className}`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500">
        {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
      </button>
      {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
};
