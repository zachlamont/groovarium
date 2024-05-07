import React from 'react';

const SelectTwoBars = ({ isTwoBars, toggleTwoBars }) => {
  return (
    <button onClick={toggleTwoBars}>
      {isTwoBars ? 'Switch to One Bar' : 'Switch to Two Bars'}
    </button>
  );
};

export default SelectTwoBars;