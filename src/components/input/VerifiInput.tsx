import React, { forwardRef } from 'react';
import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface VerifiInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isVerified: boolean;
  isValid: boolean;
  placeholder: string;
  type: 'email' | 'code' | 'birth';
  buttonText?: string;
}

export const VerifiInput = forwardRef<HTMLInputElement, VerifiInputProps>(
  ({ value, onChange, onClick, isVerified, isValid, placeholder, type, buttonText, ...props }, ref) => {
    const { isMobile } = useDeviceLayout();

    const defaultButtonText = isVerified ? '인증완료' : '인증하기';

    return (
      <div className="w-full relative">
        <input
          ref={ref}
          type={type === 'email' ? 'email' : type === 'birth' ? 'number' : 'text'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
          className={`${isMobile ? 'py-2' : 'py-6 px-4'} w-full my-2 border-2 rounded-2 ${
            isValid ? 'border-purple-500' : 'border-gray-300'
          }`}
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2">
          {type !== 'code' ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onClick) onClick(e);
              }}
              className={`${isMobile ? 'w-12 h-8 rounded-md' : 'w-24 h-12'} flex justify-center items-center text-sm p-0 rounded-md ${
                isValid ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!isValid}>
              {buttonText || defaultButtonText}
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onClick) onClick(e);
              }}
              className={`${isMobile ? 'w-12 h-8 rounded-md' : 'w-24 h-12'} flex justify-center items-center text-sm p-0 rounded-md ${
                isValid ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!isValid}>
              확인
            </button>
          )}
        </div>
      </div>
    );
  },
);
