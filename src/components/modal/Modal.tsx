import React from 'react';
import ReactDOM from 'react-dom';
import { IModalProps } from './interface';
import { useAtomValue, useSetAtom } from 'jotai';
import { modalStore } from '../../store';

export const Modal = ({ children }: IModalProps) => {
  const isModalOpen = useAtomValue(modalStore.isModalOpenAtom);
  const closeModal = useSetAtom(modalStore.closeModal);

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
};
