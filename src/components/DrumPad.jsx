import React from "react";

const DrumPad = ({
  isActive,
  isCurrent,
  onMouseDown,
  onMouseEnter,
  timingOffset,
}) => {
  const bgColor = isActive ? "bg-yellow-500" : "bg-slate-400";
  const borderColor = isCurrent ? "border-blue-500" : "border-transparent";

  return (
    <div
    className={`flex-grow w-8 h-8 m-1 border-2 ${bgColor} ${borderColor} select-none`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    >
      {timingOffset}
    </div>
  );
};

export default DrumPad;
