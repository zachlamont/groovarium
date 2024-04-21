import React from "react";

const DrumPad = ({ isActive, isCurrent, onClick }) => {
  const bgColor = isActive ? "bg-yellow-500" : "bg-slate-400";
  const borderColor = isCurrent ? "border-yellow-500" : "border-transparent";

  return (
    <div
      className={`w-8 h-8 m-1 border-2 ${bgColor} ${borderColor}`}
      onClick={onClick}
    ></div>
  );
};

export default DrumPad;
