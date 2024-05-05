import React from 'react';
import { presets } from '../constants/groovarium';

const PresetSelector = ({ onPresetSelect }) => {
  return (
    <select onChange={(e) => onPresetSelect(e.target.value)}>
      {presets.map((preset) => (
        <option key={preset.id} value={preset.id}>
          {preset.name}
        </option>
      ))}
    </select>
  );
};

export default PresetSelector;

