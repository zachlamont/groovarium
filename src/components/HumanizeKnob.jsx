import React from "react";

function HumanizeKnob({
  amount,
  setAmount,
  toggledInstruments,
  toggleInstrument,
}) {
  return (
    <div>
      <input
        type="range"
        min="0"
        max="12"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      {["kick", "snare", "hat", "clap"].map((instrument) => (
        <button
          key={instrument}
          onClick={() => toggleInstrument(instrument)}
          style={{
            backgroundColor: toggledInstruments[instrument] ? "green" : "red",
          }}
        >
          {instrument}
        </button>
      ))}
    </div>
  );
}

export default HumanizeKnob;
