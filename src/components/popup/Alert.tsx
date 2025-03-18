import { useEffect } from 'react';
interface AlertProps {
  message: string;
  onClose: () => void;
}

export const Alert = ({ message, onClose }: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 1000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex justify-center items-center" onClick={onClose}>
      <div
        className="bg-[#111111] bg-opacity-80 text-white p-6 rounded-lg shadow-xl w-4/5 md:w-3/5 lg:w-2/5 text-center relative"
        onClick={(e) => e.stopPropagation()}>
        <p className="text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};
