import React from 'react';
import ReactDOM from 'react-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { modalStore } from '../../store';
import { IModalProps } from './interface';

export const Modal = ({ title, children }: IModalProps) => {
  const isModalOpen = useAtomValue(modalStore.isModalOpenAtom);
  const closeModal = useSetAtom(modalStore.closeModal);

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-xl shadow-lg w-[80%] max-w-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="bg-purple-500 text-white text-xl font-bold py-7 px-8">
            {title}
            <button onClick={() => closeModal} className="absolute right-16 text-gray-500 text-xl font-bold">
              X
            </button>
          </div>
        )}
        <div className="px-5 py-6 space-y-4">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
};
