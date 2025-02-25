import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface VerifiInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isVerified: boolean;
  isValid: boolean;
  placeholder: string;
  type: 'email' | 'code' | 'birth';
  buttonText?: string; // 버튼 텍스트 커스터마이즈를 위한 선택적 prop
  register?: any;
}

export const VerifiInput = ({
  value,
  onChange,
  onClick,
  isVerified,
  isValid,
  placeholder,
  type,
  buttonText,
  register,
}: VerifiInputProps) => {
  const { isMobile } = useDeviceLayout();
  const defaultButtonText = type === 'email' ? (isVerified ? '인증완료' : '인증하기') : '확인';
  return (
    <div className="w-full relative">
      <input
        type="text"
        value={value}
        {...(register ? register(type) : {})}
        onChange={onChange}
        placeholder={placeholder}
        className={`${isMobile ? 'py-2' : 'py-6 px-4'} w-full my-2 border-2 rounded-2 ${
          isValid ? 'border-purple-500' : 'border-gray-300'
        }`}
      />
      <div className="absolute right-5 top-1/2 -translate-y-1/2">
        <button
          onClick={(e) => {
            if (onClick) onClick(e);
          }}
          className={`${isMobile ? 'w-12 h-8 rounded-md' : 'w-24 h-12'} flex justify-center items-center text-sm p-0 rounded-md ${
            isValid ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!isValid} // 인증이 완료되면 버튼을 비활성화
        >
          {buttonText || defaultButtonText}
          {buttonText}
        </button>
      </div>
    </div>
  );
};
