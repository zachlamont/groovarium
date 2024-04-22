export function calculateTimingOffset(pushPull, instrument, index, steps) {
  const stepNumbers = {
    "1/8": [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31],
    "1/4": [1, 5, 9, 13, 17, 21, 25, 29],
    backbeat: [5, 13, 21, 29],
  };

  if (stepNumbers[steps].includes(index + 1)) {
    return pushPull;
  }

  return 0;
}
