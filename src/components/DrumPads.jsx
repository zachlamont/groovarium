import React from "react";
import DrumPad from "./DrumPad";

const DrumPads = ({
  drumPattern,
  currentStep,
  instrument,
  onToggleDrumPad,
}) => {
  const toggleDrumPad = (index) => {
    onToggleDrumPad(instrument, index);
  };

  return (
    <div className="flex justify-center items-center">
      {drumPattern[instrument].pattern.map((isActive, index) => (
        <DrumPad
          key={index}
          isActive={isActive}
          isCurrent={index === currentStep}
          onClick={() => toggleDrumPad(index)}
        />
      ))}
    </div>
  );
};

export default DrumPads;
