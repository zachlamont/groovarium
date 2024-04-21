// utils/calculateTimingOffset.js
export const calculateTimingOffset = (pushPullSnare, instrument, noteIndex) => {
    // Calculate the timing offset based on the instrument and note index
    // For now, we'll just return pushPullSnare for 'snare' notes, and 0 for other notes
    return instrument === 'snare' ? pushPullSnare : 0;
  };
  