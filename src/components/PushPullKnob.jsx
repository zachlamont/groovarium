// PushPullKnob.jsx
import React from "react";

const PushPullKnob = ({ instrument, setPushPull, pushPullValue }) => {
  const handleOnChange = (event) => {
    setPushPull(instrument, parseInt(event.target.value), pushPullValue.steps);
  };

  const handleSelectChange = (event) => {
    setPushPull(instrument, pushPullValue.offset, event.target.value);
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
      <select value={pushPullValue.steps} onChange={handleSelectChange}>
        <option value="1/8">1/8</option>
        <option value="1/4">1/4</option>
        <option value="backbeat">Backbeat</option>
      </select>
      <div>Current offset: {pushPullValue.offset}</div>
      <div>Current steps: {pushPullValue.steps}</div>
    </div>
  );
};

export default PushPullKnob;
