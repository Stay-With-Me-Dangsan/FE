import { useDeviceLayout } from '../../hooks/useDeviceLayout';
import React, { forwardRef } from 'react';

interface AuthIProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'email' | 'password' | 'date' | 'datetime-local' | 'number';
  className?: string;
  placeholder?: string;
  errorMessage?: string; // 유효성 검사 메시지
  isValid?: boolean; // 유효성 검사 결과 (유효하면 true)
  children?: React.ReactNode;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthIProps>(
  ({ errorMessage, isValid, className, ...props }, ref) => {
    const { isMobile } = useDeviceLayout();
    // 테두리 색상 동적 적용
    const borderClass = errorMessage
      ? 'border-red-500' // 유효성 실패 시 빨간색
      : isValid
        ? 'border-purple-500' // 유효성 성공 시 보라색
        : 'border-gray-300'; // 기본값 (회색)

    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`${isMobile ? 'py-2' : 'py-6 px-4'} w-full  border-2 rounded-2 ${borderClass} focus:outline-none ${className}`}
          {...props}
        />
        {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
      </div>
    );
  },
);
