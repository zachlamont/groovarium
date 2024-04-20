// PlayButton.jsx
import React from "react";

const PlayButton = ({ togglePlayback, isPlaying }) => {
  return (
    <button
      onClick={togglePlayback}
      className="mt-10 w-40 text-white font-bold bg-violet-500 bg-opacity-70 border border-white border-opacity-50 hover:bg-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-300 rounded-xl px-5 py-2.5 transition-all duration-150 ease-in-out"
    >
      {isPlaying ? "Pause" : "Play"}
    </button>
  );
};

export default PlayButton;
