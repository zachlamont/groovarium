// Function to calculate pushPull offset
function calculatePushPullOffset(pushPull, index, steps) {
  const stepNumbers = {
    "1/8": [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31],
    "1/4": [1, 5, 9, 13, 17, 21, 25, 29],
    backbeat: [5, 13, 21, 29],
  };

  if (steps && stepNumbers[steps].includes(index + 1)) {
    return pushPull;
  }

  return 0;
}

// Function to calculate humanization offset
function calculateHumanizationOffset(amount, toggledInstruments, instrument) {
  if (toggledInstruments[instrument]) {
    return Math.floor(Math.random() * (amount * 2 + 1)) - amount;
  }

  return 0;
}

// calculateTimingOffset.js
function calculateSwingOffset(
  swingAmount,
  swingToggledInstruments,
  instrument,
  index
) {
  if (swingToggledInstruments[instrument] && index % 2 === 1) {
    return swingAmount;
  }

  return 0;
}

// Main function to calculate total offset
export function calculateTimingOffset(
  pushPull,
  instrument,
  index,
  steps,
  amount,
  toggledInstruments,
  swingAmount,
  swingToggledInstruments
) {
  const pushPullOffset = calculatePushPullOffset(pushPull, index, steps);
  const humanizationOffset = calculateHumanizationOffset(
    amount,
    toggledInstruments,
    instrument
  );
  const swingOffset = calculateSwingOffset(
    swingAmount,
    swingToggledInstruments,
    instrument,
    index
  );

  return pushPullOffset + humanizationOffset + swingOffset;
}
