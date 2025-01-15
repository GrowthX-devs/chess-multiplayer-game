import React from "react";
import { FaTimes } from "react-icons/fa"; // Import the close icon from react-icons

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-auto max-w-[90%] min-w-[300px] relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
        <div className="mb-6 text-center">{content}</div>
      </div>
    </div>
  );
};

export default Modal;
