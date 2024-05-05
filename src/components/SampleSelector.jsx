// SampleSelector.jsx
import React, { useState, useEffect } from "react";

const drumKits = {
  Rock: { kick: "funk", snare: "funk", hat: "funk", clap: "funk" },
  Funk: { kick: "funk", snare: "funk", hat: "funk", clap: "funk" },
  Hiphop: { kick: "hiphop", snare: "hiphop", hat: "hiphop", clap: "hiphop" },
  Jazz: { kick: "hiphop", snare: "hiphop", hat: "hiphop", clap: "hiphop" },
};

const SampleSelector = ({ selectedSamples, setSelectedSamples }) => {
  const [selectedKit, setSelectedKit] = useState("Rock");

  useEffect(() => {
    setSelectedSamples(drumKits[selectedKit]);
  }, [selectedKit, setSelectedSamples]);

  const handleKitChange = (event) => {
    setSelectedKit(event.target.value);
  };

  const handleSampleChange = (instrument, direction) => {
    const kits = Object.keys(drumKits);
    const currentKitIndex = kits.indexOf(selectedSamples[instrument]);
    let newKitIndex = currentKitIndex + direction; 
    if (newKitIndex < 0) newKitIndex = kits.length - 1;
    if (newKitIndex >= kits.length) newKitIndex = 0;
    setSelectedSamples({
      ...selectedSamples,
      [instrument]: kits[newKitIndex],
    });
  };

  return (
    <div>
      <select value={selectedKit} onChange={handleKitChange}>
        {Object.keys(drumKits).map((kit) => (
          <option key={kit} value={kit}>
            {kit}
          </option>
        ))}
      </select>

      <div>
        {Object.keys(selectedSamples).map((instrument) => (
          <div key={instrument}>
            <button onClick={() => handleSampleChange(instrument, -1)}>
              Previous
            </button>
            <span>
              {instrument}: {selectedSamples[instrument]}
            </span>
            <button onClick={() => handleSampleChange(instrument, 1)}>
              Next
            </button>
          </div>
        ))}
      </div>
      <div>
        <h3>Current selectedSamples state:</h3>
        <pre>{JSON.stringify(selectedSamples, null, 2)}</pre>
      </div>
    </div>
  );
};

export default SampleSelector;
