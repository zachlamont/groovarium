import React from "react";
import { presets } from "../constants/groovarium";

const PresetSelector = ({
  onPresetSelect,
  selectedGenre,
  selectedPresetId,
}) => {
  const genrePresets = presets[selectedGenre] || [];

  return (
    <select
      value={selectedPresetId}
      onChange={(e) => onPresetSelect(e.target.value, selectedGenre)}
    >
      {genrePresets.map((preset) => (
        <option key={preset.id} value={preset.id}>
          {preset.name}
        </option>
      ))}
    </select>
  );
};

export default PresetSelector;
