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
    const handleMouseDown = () => {
      // console.log("Mouse button pressed");
      setIsMouseDown(true);
      console.log("mouse is down");
    };
    const handleMouseUp = () => {
      //console.log("Mouse button released");
      setIsMouseDown(false);
      console.log("mouse is up");
    };

    // Listen for mouse events on the whole window
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      console.log("cleanup mousedown"); //only gets logged upon page load
      window.removeEventListener("mousedown", handleMouseDown);
      console.log("cleanup mouseup"); //only gets logged upon page load
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const toggleDrumPad = (index) => {
    onToggleDrumPad(instrument, index);
  };

  return (
    <div className="flex justify-center items-center w-full">
      {drumPattern[instrument].pattern.map((isActive, index) => {
        return (
          <DrumPad
            key={index}
            isActive={isActive}
            isCurrent={index === currentStep}
            onMouseDown={() => {
              toggleDrumPad(index);
              console.log("Mouse clicked", instrument, "DrumPad", index);
            }}
            onMouseEnter={() => {
              if (isMouseDown) {
                console.log(
                  "Mouse entered",
                  instrument,
                  "DrumPad",
                  index,
                  "while button is pressed" //Correctly logs the instrument and index of the DrumPad component that the user is dragging over
                );
                console.log("before toggle", drumPattern[instrument].pattern); //Correctly logs the pattern before toggling
                toggleDrumPad(index);
                console.log("after toggle", drumPattern[instrument].pattern); //The problem is here, IF react strict mode is on, when the user drags over multiple DrumPad components with the mouse held down, only the first one gets toggled.
              }
            }}
            timingOffset={drumPattern[instrument].timingOffsets[index]}
          />
        );
      })}
    </div>
  );
};

export default DrumPads;
