import React, { useState, useEffect } from "react";
import PlayButton from "./PlayButton";
import * as Tone from "tone";
import BpmSlider from "./BpmSlider";

import useSamplePlayers from "../utils/groovarium/useSamplePlayers";
import PushPullKnob from "./PushPullKnob"; // Import the new component
import { calculateTimingOffset } from "../utils/groovarium/calculateTimingOffset";
import { drumPattern as drumPatternConstant } from "../constants/groovarium";
import useDebounce from "../utils/groovarium/useDebounce";
import DrumPads from "./DrumPads";

const Groovarium = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120); // Default BPM
  const [currentStep, setCurrentStep] = useState(0);

  const [drumPattern, setDrumPattern] = useState({ ...drumPatternConstant }); // Create a copy of drumPattern
  const [pushPullSnare, setPushPullSnare] = useState({
    offset: 0,
    steps: "1/8",
  }); // Default to '1/8'
  const debouncedPushPullSnare = useDebounce(pushPullSnare, 600); // Debounce pushPullSnare changes by 300ms

  const setPushPull = (instrument, value, steps) => {
    if (instrument === "snare") {
      setPushPullSnare({ offset: value, steps: steps });

      // Create a new drumPattern object with updated timingOffsets for the snare
      setDrumPattern((prevDrumPattern) => {
        const newDrumPattern = { ...prevDrumPattern }; // Create a copy of the previous drumPattern
        newDrumPattern[instrument].timingOffsets = newDrumPattern[
          instrument
        ].pattern.map((_, index) =>
          calculateTimingOffset(value, instrument, index, steps)
        );
        return newDrumPattern;
      });
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
        drumPattern[instrument].pattern.forEach((play, index) => {
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
                if (players[instrument].loaded) { // Check if the player is loaded before starting
                players[instrument].start(time);
                setCurrentStep(index);
                }
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
    Object.values(players).forEach((player) => {
      if (player.state === "started") { // Check if the player has started before disposing
        player.dispose();
      }
    });
  };
}, [allLoaded, debouncedPushPullSnare, drumPattern]); // Added drumPattern to the dependency array

  const togglePlayback = async () => {
    await Tone.start();
    if (!isPlaying && allLoaded) {
      Tone.Transport.start();
    } else {
      Tone.Transport.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleDrumPad = (instrument, index) => {
    setDrumPattern((prevPattern) => {
      const newPattern = { ...prevPattern };
      newPattern[instrument].pattern[index] =
        !newPattern[instrument].pattern[index];
      return newPattern;
    });
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
      <DrumPads
        drumPattern={drumPattern}
        currentStep={currentStep}
        instrument="snare"
        onToggleDrumPad={toggleDrumPad}
      />

      <div>
        <pre>{JSON.stringify(drumPattern, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Groovarium;
