// PushPullKnob.jsx
import React from "react";

const PushPullKnob = ({ instrument, setPushPull, pushPullValue }) => {
  const handleOnChange = (event) => {
    setPushPull(instrument, parseInt(event.target.value));
  };

  return (
    <div>
      <label>{instrument} Push/Pull</label>
      <input
        type="range"
        min="-24"
        max="24"
        defaultValue="0"
        onChange={handleOnChange}
      />
      <div>Current value: {pushPullValue}</div>
    </div>
  );
};

export default PushPullKnob;
