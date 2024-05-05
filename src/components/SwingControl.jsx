import React from "react";
import XYPad from "./XyPad"; // Import the custom XYPad component

const SwingControl = ({
  swingAmount,
  setSwingAmount,
  swing8Amount,
  setSwing8Amount,
  swingToggledInstruments,
  setSwingToggledInstruments,
  swing8ToggledInstruments,
  setSwing8ToggledInstruments,
}) => {
  const handleXYChange = (values) => {
    setSwingAmount(Math.round(values.x * 24)); // Scale x from 0 to 1 to 0 to 24
    setSwing8Amount(Math.round(values.y * 48)); // Scale y from 0 to 1 to 0 to 48
  };

  const handleToggleChange = (instrument, is8thNote) => {
    if (is8thNote) {
      setSwing8ToggledInstruments((prev) => ({
        ...prev,
        [instrument]: !prev[instrument],
      }));
    } else {
      setSwingToggledInstruments((prev) => ({
        ...prev,
        [instrument]: !prev[instrument],
      }));
    }
  };

  return (
    <div className="bg-emerald-600 p-4">
      <XYPad
        width={300}
        height={300}
        onChange={handleXYChange}
        swingAmount={(swingAmount / 24) * 300}
        swing8Amount={(swing8Amount / 48) * 300} // Invert initial Y to align with XY pad logic
      />

      <div>Current 16th note swing amount: {swingAmount}</div>
      <div>
        {["kick", "snare", "hat", "clap"].map((instrument) => (
          <div key={instrument}>
            <label>{instrument}</label>
            <input
              type="checkbox"
              checked={swingToggledInstruments[instrument]}
              onChange={() => handleToggleChange(instrument, false)}
            />
          </div>
        ))}
      </div>
      <div>Current 8th note swing amount: {swing8Amount}</div>
      <div>
        {["kick", "snare", "hat", "clap"].map((instrument) => (
          <div key={instrument}>
            <label>{instrument}</label>
            <input
              type="checkbox"
              checked={swing8ToggledInstruments[instrument]}
              onChange={() => handleToggleChange(instrument, true)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwingControl;
