// SelectGhostNotes.jsx
import React from "react";

const SelectGhostNotes = ({ isGhostNotes, setIsGhostNotes }) => {
  const handleToggle = () => {
    setIsGhostNotes(!isGhostNotes);
  };

  return (
    <div>
      <label>
        Ghost Notes
        <input type="checkbox" checked={isGhostNotes} onChange={handleToggle} />
      </label>
    </div>
  );
};

export default SelectGhostNotes;
