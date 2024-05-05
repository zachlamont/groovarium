export const drumPattern = {
  kick: {
    pattern: [
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    timingOffsets: Array(32).fill(0),
  },
  snare: {
    pattern: [
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
    ],
    timingOffsets: Array(32).fill(0),
  },
  hat: {
    pattern: [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    timingOffsets: Array(32).fill(0),
  },
  clap: {
    pattern: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    ],
    timingOffsets: Array(32).fill(0),
  },
};

export const presets = [
  {
    id: 1,
    name: "Preset 1",
    bpm: 100,
    selectedSamples: {
      kick: "rock",
      snare: "rock",
      hat: "rock",
      clap: "rock",
    },
    isGhostNotes: false,
    drumPattern: {
      kick: {
        pattern: [
          true,
          false,
          true,
          false,
          false,
          false,
          false,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          true,
          false,
          false,
          false,
          false,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        timingOffsets: Array(32).fill(0),
      },
      snare: {
        pattern: [
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
        ],
        timingOffsets: Array(32).fill(0),
      },
      hat: {
        pattern: [
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
        ],
        timingOffsets: Array(32).fill(0),
      },
      clap: {
        pattern: [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
        ],
        timingOffsets: Array(32).fill(0),
      },
    },
    pushPullSnare: {
      offset: 0,
      steps: "1/8",
    },
    pushPullHat: {
      offset: 0,
      steps: "1/8",
    },
    pushPullClap: {
      offset: 0,
      steps: "1/8",
    },
    swingAmount: 0,
    swingToggledInstruments: {
      kick: true,
      snare: true,
      hat: true,
      clap: true,
    },
    swing8Amount: 0,
    swing8ToggledInstruments: {
      kick: true,
      snare: true,
      hat: true,
      clap: true,
    },
    amount: 0,
    toggledInstruments: {
      kick: false,
      snare: false,
      hat: false,
      clap: false,
    },
  },
  {
    id: 2,
    name: "Preset 2",
    bpm: 100,
    selectedSamples: {
      kick: "hiphop",
      snare: "hiphop",
      hat: "hiphop",
      clap: "hiphop",
    },
    isGhostNotes: false,
    drumPattern: {
      kick: {
        pattern: [
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          true,
          true,
          false,
          false,
          true,
          false,
          true,
        ],
        timingOffsets: [
          0, 11, 8, 12, 0, 13, 8, 11, -2, 10, 6, 11, 0, 13, 5, 14, 2, 12, 4, 12,
          1, 13, 7, 10, 0, 13, 7, 12, -2, 13, 6, 14,
        ],
      },
      snare: {
        pattern: [
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
        ],
        timingOffsets: [
          -3, 10, -1, 14, -4, 13, 1, 14, -7, 14, 2, 12, -5, 11, -1, 11, -7, 14,
          3, 10, -4, 10, 2, 14, -7, 11, 2, 14, -5, 10, 1, 10,
        ],
      },
      hat: {
        pattern: [
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
        ],
        timingOffsets: [
          -1, 12, 8, 12, -2, 13, 7, 14, 0, 14, 6, 14, 0, 11, 5, 14, 0, 13, 5,
          10, -2, 10, 5, 12, 1, 11, 8, 10, 1, 10, 5, 14,
        ],
      },
      clap: {
        pattern: [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
        ],
        timingOffsets: [
          0, 11, 6, 11, -2, 10, 7, 12, 2, 11, 8, 13, 2, 11, 7, 10, 1, 12, 5, 14,
          -2, 14, 5, 11, 0, 13, 6, 13, 0, 13, 5, 11,
        ],
      },
    },
    pushPullSnare: {
      offset: -5,
      steps: "1/8",
    },
    pushPullHat: {
      offset: 0,
      steps: "1/8",
    },
    pushPullClap: {
      offset: 0,
      steps: "1/8",
    },
    swingAmount: 12,
    swingToggledInstruments: {
      kick: true,
      snare: true,
      hat: true,
      clap: true,
    },
    swing8Amount: 6,
    swing8ToggledInstruments: {
      kick: true,
      snare: true,
      hat: true,
      clap: true,
    },
    amount: 2,
    toggledInstruments: {
      kick: false,
      snare: false,
      hat: false,
      clap: false,
    },
  },
  {
    id: 3,
    name: "Preset 3",
    bpm: 100,
    selectedSamples: {
      kick: "hiphop",
      snare: "hiphop",
      hat: "rock",
      clap: "rock",
    },
    isGhostNotes: true,
    drumPattern: {
      kick: {
        pattern: [
          true,
          false,
          true,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          true,
          false,
          false,
          true,
          false,
          true,
        ],
        timingOffsets: [
          0, 21, 7, 20, 1, 19, 7, 20, 1, 20, 7, 19, 1, 19, 8, 19, -1, 20, 7, 19,
          1, 20, 6, 19, 0, 19, 8, 20, 1, 21, 6, 20,
        ],
      },
      snare: {
        pattern: [
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
        ],
        timingOffsets: [
          1, 20, 7, 21, 0, 20, 8, 20, 1, 21, 8, 21, -1, 21, 6, 20, -1, 20, 6,
          19, 0, 20, 7, 20, 1, 19, 7, 20, 0, 20, 8, 21,
        ],
      },
      hat: {
        pattern: [
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          true,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          true,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
        ],
        timingOffsets: [
          2, 21, 9, 19, 3, 21, 11, 19, 4, 19, 9, 20, 4, 20, 10, 21, 3, 20, 9,
          21, 3, 21, 11, 20, 3, 19, 11, 20, 2, 19, 11, 21,
        ],
      },
      clap: {
        pattern: [
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
        ],
        timingOffsets: [
          0, 19, 8, 21, -1, 19, 6, 20, -1, 19, 8, 19, -1, 19, 6, 20, 0, 19, 7,
          19, 0, 21, 8, 21, -1, 19, 6, 19, -1, 21, 8, 19,
        ],
      },
    },
    pushPullSnare: {
      offset: 24,
      steps: "1/4",
    },
    pushPullHat: {
      offset: 3,
      steps: "1/4",
    },
    pushPullClap: {
      offset: 7,
      steps: "1/8",
    },
    swingAmount: 20,
    swingToggledInstruments: {
      kick: true,
      snare: true,
      hat: true,
      clap: true,
    },
    swing8Amount: 7,
    swing8ToggledInstruments: {
      kick: false,
      snare: true,
      hat: true,
      clap: true,
    },
    amount: 12,
    toggledInstruments: {
      kick: false,
      snare: true,
      hat: true,
      clap: true,
    },
  },
  // More presets...
];
