import React from "react";

interface ModalProps {
  isOpen: boolean;
  winner: string | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, winner, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {winner ? `${winner} Wins!` : "It’s a Draw!"}
        </h2>
        <img
          src="https://media1.tenor.com/m/AWGIkbz2B-EAAAAC/aag-lagadi-anu-malik.gif"
          alt="Emotion_gif"
        />
        <button
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
          onClick={onClose}
        >
          Start a new game
        </button>
      </div>
    </div>
  );
};

export default Modal;
