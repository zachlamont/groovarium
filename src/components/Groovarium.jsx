import React, { useState, useEffect } from "react";
import PlayButton from "./PlayButton";
import * as Tone from "tone";
import BpmSlider from "./BpmSlider";

import useSamplePlayers from "../utils/groovarium/useSamplePlayers";
import PushPullKnob from "./PushPullKnob"; // Import the new component
import { calculateTimingOffset } from "../utils/groovarium/calculateTimingOffset";
import { drumPattern as drumPatternConstant } from "../constants/groovarium";
import useDebounce from "../utils/groovarium/useDebounce";

const Groovarium = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120); // Default BPM
  const [pushPullSnare, setPushPullSnare] = useState({
    offset: 0,
    steps: "1/8",
  }); // Default to '1/8'
  const [drumPattern, setDrumPattern] = useState({ ...drumPatternConstant }); // Create a copy of drumPattern
  const debouncedPushPullSnare = useDebounce(pushPullSnare, 300); // Debounce pushPullSnare changes by 300ms

  const setPushPull = (instrument, value, steps) => {
    if (instrument === "snare") {
      setPushPullSnare({ offset: value, steps: steps });
    }
    // Add more conditions here for other instruments
  };

  const { players, allLoaded } = useSamplePlayers();

  // This useEffect will update the BPM in Tone.Transport whenever bpm state changes
  useEffect(() => {
    Tone.Transport.bpm.value = bpm; // Set the BPM value
  }, [bpm]);

  useEffect(() => {
    if (allLoaded) {
      Object.keys(drumPattern).forEach((instrument) => {
        drumPattern[instrument].forEach((play, index) => {
          if (play) {
            const timeInTicks = index * 48; // Tone.js defaults to 192 ppq, which is equal to 48 ticks per sixteenth note
            const timingOffset = calculateTimingOffset(
              debouncedPushPullSnare.offset,
              instrument,
              index,
              debouncedPushPullSnare.steps
            );
            const offsetTimeInTicks = timeInTicks + timingOffset;
            Tone.Transport.scheduleRepeat(
              (time) => {
                players[instrument].start(time);
              },
              "2m", // Repeat after 2 measures
              Tone.Ticks(offsetTimeInTicks).toSeconds()
            );
          }
        });
      });
    }

    // Cleanup function
    return () => {
      Tone.Transport.cancel(0);
      Object.values(players).forEach((player) => player.dispose());
    };
  }, [allLoaded, debouncedPushPullSnare]); // Depend on debouncedPushPullSnare instead of pushPullSnare

  const togglePlayback = async () => {
    await Tone.start();
    if (!isPlaying && allLoaded) {
      Tone.Transport.start();
    } else {
      Tone.Transport.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <h1 className="text-center text-xl font-bold mb-4">Groovarium</h1>
      <PlayButton
        togglePlayback={togglePlayback}
        isPlaying={isPlaying}
        disabled={!allLoaded}
      />
      <BpmSlider selectedBPM={bpm} setSelectedBPM={setBpm} />
      <PushPullKnob
        instrument="snare"
        setPushPull={setPushPull}
        pushPullValue={pushPullSnare}
      />
      {/* Render the new component */}
    </div>
  );
};

export default Groovarium;
