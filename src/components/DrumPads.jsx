import React, { useState, useEffect } from "react";
import DrumPad from "./DrumPad";

const DrumPads = ({
  drumPattern,
  currentStep,
  instrument,
  onToggleDrumPad,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Register global mouse down and up handlers
  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    // Listen for mouse events on the whole window
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const toggleDrumPad = (index) => {
    onToggleDrumPad(instrument, index);
  };

  return (
    <div className="flex justify-center items-center">
      {drumPattern[instrument].pattern.map((isActive, index) => {
        return (
          <DrumPad
            key={index}
            isActive={isActive}
            isCurrent={index === currentStep}
            onMouseDown={() => toggleDrumPad(index)}
            onMouseEnter={() => isMouseDown && toggleDrumPad(index)}
            timingOffset={drumPattern[instrument].timingOffsets[index]}
          />
        );
      })}
    </div>
  );
};

export default DrumPads;

