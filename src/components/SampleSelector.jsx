// SampleSelector.jsx
import React, { useState, useEffect } from "react";

const drumKits = {
  Rock: { kick: "rock", snare: "rock", hat: "rock", clap: "rock" },
  Funk: { kick: "funk", snare: "funk", hat: "funk", clap: "funk" },
  Hiphop: { kick: "hiphop", snare: "hiphop", hat: "hiphop", clap: "hiphop" },
  Jazz: { kick: "jazz", snare: "jazz", hat: "jazz", clap: "jazz" },
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
    const samples = Object.values(drumKits).map((kit) => kit[instrument]);
    const currentSampleIndex = samples.indexOf(selectedSamples[instrument]);
    let newSampleIndex = currentSampleIndex + direction;
    if (newSampleIndex < 0) newSampleIndex = samples.length - 1;
    if (newSampleIndex >= samples.length) newSampleIndex = 0;
    console.log(samples[newSampleIndex]);
    setSelectedSamples({
      ...selectedSamples,
      [instrument]: samples[newSampleIndex],
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
