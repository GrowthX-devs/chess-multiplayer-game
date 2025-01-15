import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/modal";
import { generateGameLinkConfig } from "../services/gameService";
import useMutation from "../hooks/useMutation";
import { AiFillCopy } from "react-icons/ai";

type PostResponse = {
  game_id: string;
  link: string;
};

const WelcomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"join" | "create">("create");
  const [gameLink, setGameLink] = useState<string>("");
  const navigate = useNavigate();

  // Use the custom mutation hook
  const { data, loading, error, mutate } = useMutation<PostResponse>(
    generateGameLinkConfig
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const startGame = () => {
    if (data?.link) {
      closeModal();
      navigate(`/play/${data.game_id}`);
    } else {
      console.error("Game link not available");
    }
  };

  const joinGame = () => {
    if (gameLink.trim()) {
      closeModal();
      navigate(`/play/${gameLink.split("/").pop()}`);
    }
  };

  const copyLink = () => {
    if (data?.link) {
      navigator.clipboard.writeText(data.link);
    }
  };

  const generateLink = () => {
    setMode("create");
    mutate();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Chess Game!</h1>
      <p className="mb-6">
        Invite your friends to play and enjoy a game of chess together!
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={openModal}
        disabled={loading}
      >
        {loading ? "Loading..." : "Learn More"}
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Welcome to the Chess Game!"
        content={
          <>
            <div className="mt-4 flex justify-center">
              <button
                className={`px-4 py-2 rounded-l ${
                  mode === "join"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setMode("join")}
              >
                Join Game
              </button>
              <button
                className={`px-4 py-2 rounded-r ${
                  mode === "create"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={generateLink}
                disabled={mode === "create" && loading}
              >
                Create Game
              </button>
            </div>

            {mode === "join" ? (
              <div className="mt-4">
                <p>Enter the game link shared by your friend:</p>
                <input
                  type="text"
                  placeholder="Enter game link"
                  className="border p-2 w-full rounded mt-2"
                  value={gameLink}
                  onChange={(e) => setGameLink(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  onClick={joinGame}
                  disabled={!gameLink.trim()}
                >
                  Join Game
                </button>
              </div>
            ) : (
              <div className="mt-4">
                {loading ? (
                  <p>Generating game link...</p>
                ) : error ? (
                  <p className="text-red-500">Error: {error}</p>
                ) : data ? (
                  <>
                    <p>
                      Your game link is ready! Share this with your friends to
                      join:
                    </p>
                    <div className="flex items-center justify-center p-2 bg-slate-100 w-[500px] mt-4">
                      <p className="text-blue-500 mt-2 text-sm">{data.link}</p>
                      <div className="ml-4">
                        <AiFillCopy
                          size={20}
                          onClick={copyLink}
                          className="cursor-pointer hover:text-blue-600 focus:scale-90 transition-transform duration-200 ease-in-out active:scale-110 active:transform-gpu"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={startGame}
                        disabled={!data || loading}
                      >
                        Start Game
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={generateLink}
                    disabled={loading}
                  >
                    Generate Link
                  </button>
                )}
              </div>
            )}
          </>
        }
      />
    </div>
  );
};

export default WelcomePage;
