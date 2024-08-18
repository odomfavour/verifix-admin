import React, { ReactNode, CSSProperties } from 'react';
import { BsXLg } from 'react-icons/bs';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  maxWidth = '640px',
}) => {
  return (
    <>
      {isOpen ? (
        <div
          className={`fixed inset-0 flex items-center justify-center transition-all ease-in-out duration-500 z-50`}
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div
            className="bg-white p-5 rounded-lg z-50 sm:w-[95%] mx-auto overflow-auto max-h-[95vh]"
            style={{ maxWidth } as CSSProperties}
          >
            <div className="flex justify-between items-center mb-3">
              <p className="font-bold text-2xl">{title}</p>
              <BsXLg
                className="cursor-pointer text-primary"
                role="button"
                onClick={onClose}
              />
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
