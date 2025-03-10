interface AlertProps {
  message: string;
  onClose: () => void;
}

export const Alert = ({ message, onClose }: AlertProps) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-800 text-white p-4 rounded-md shadow-lg">
        <p>{message}</p>
        <button onClick={onClose} className="mt-2 bg-white text-black px-3 py-1 rounded">
          확인
        </button>
      </div>
    </div>
  );
};
