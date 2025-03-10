import { useState, forwardRef } from 'react';
import eyeOpen from '../../asset/images/visible--eye-open.png';
import eyeClose from '../../asset/images/eye-close.png';
import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface PasswordInputProps {
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  borderColor?: 'gray' | 'purple';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { placeholder = '비밀번호 입력', className, errorMessage, borderColor = 'gray', value = '', onChange, ...rest },
    ref,
  ) => {
    const { isMobile } = useDeviceLayout();
    const [showPassword, setShowPassword] = useState(false);

    const isValidPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);

    const border_color = errorMessage
      ? 'border-red-500'
      : isValidPassword
        ? 'border-purple-500'
        : borderColor === 'purple'
          ? 'border-purple-500'
          : 'border-gray-300';

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${isMobile ? 'py-2' : 'py-6 px-4'} w-full my-2 border-2 rounded-2
          ${border_color} ${className}`}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500">
          {showPassword ? <img src={eyeClose} width={24} /> : <img src={eyeOpen} width={24} />}
        </button>
        {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
      </div>
    );
  },
);
