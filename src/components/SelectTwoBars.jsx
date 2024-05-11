import React from "react";

const SelectTwoBars = ({ isTwoBars, toggleTwoBars, handleDelete }) => {
  return (
    <div>
      <button onClick={toggleTwoBars}>{isTwoBars ? "<" : ">"}</button>
      {isTwoBars && <button onClick={handleDelete}>Delete</button>}
    </div>
  );
};

export default SelectTwoBars;
