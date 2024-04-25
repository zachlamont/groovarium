// SwingControl.jsx
import React from "react";

const SwingControl = ({ swingAmount, setSwingAmount, swing8Amount, setSwing8Amount, swingToggledInstruments, setSwingToggledInstruments }) => {
  const handleSliderChange = (event, is8thNote) => {
    if (is8thNote) {
      setSwing8Amount(parseInt(event.target.value));
    } else {
      setSwingAmount(parseInt(event.target.value));
    }
  };

  const handleToggleChange = (instrument) => {
    setSwingToggledInstruments(prev => ({
      ...prev,
      [instrument]: !prev[instrument]
    }));
  };

  return (
    <div className="bg-emerald-600">
      <label>16th Note Swing Amount</label>
      <input
        type="range"
        min="0"
        max="24"
        value={swingAmount}
        onChange={(event) => handleSliderChange(event, false)}
      />
      <div>Current 16th note swing amount: {swingAmount}</div>
      <label>8th Note Swing Amount</label>
      <input
        type="range"
        min="0"
        max="48"
        value={swing8Amount}
        onChange={(event) => handleSliderChange(event, true)}
      />
      <div>Current 8th note swing amount: {swing8Amount}</div>
      <div>
        {['kick', 'snare', 'hat', 'clap'].map(instrument => (
          <div key={instrument}>
            <label>{instrument}</label>
            <input
              type="checkbox"
              checked={swingToggledInstruments[instrument]}
              onChange={() => handleToggleChange(instrument)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwingControl;


