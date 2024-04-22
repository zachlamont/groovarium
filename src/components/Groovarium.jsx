import React, { useState, useEffect } from "react";
import PlayButton from "./PlayButton";
import * as Tone from "tone";
import BpmSlider from "./BpmSlider";

import useSamplePlayers from "../utils/groovarium/useSamplePlayers";
import PushPullKnob from "./PushPullKnob";
import { calculateTimingOffset } from "../utils/groovarium/calculateTimingOffset";
import { drumPattern as drumPatternConstant } from "../constants/groovarium";
import useDebounce from "../utils/groovarium/useDebounce";
import DrumPads from "./DrumPads";

const Groovarium = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [currentStep, setCurrentStep] = useState(0);

  const [drumPattern, setDrumPattern] = useState({ ...drumPatternConstant });
  const [pushPullSnare, setPushPullSnare] = useState({
    offset: 0,
    steps: "1/8",
  });
  const [pushPullHat, setPushPullHat] = useState({
    offset: 0,
    steps: "1/8",
  });
  const debouncedPushPullSnare = useDebounce(pushPullSnare, 600);
  const debouncedPushPullHat = useDebounce(pushPullHat, 600);

  const setPushPull = (instrument, value, steps) => {
    if (instrument === "snare") {
      setPushPullSnare({ offset: value, steps: steps });
    } else if (instrument === "hat") {
      setPushPullHat({ offset: value, steps: steps });
    }

    setDrumPattern((prevDrumPattern) => {
      const newDrumPattern = { ...prevDrumPattern };
      newDrumPattern[instrument].timingOffsets = newDrumPattern[
        instrument
      ].pattern.map((_, index) =>
        calculateTimingOffset(value, instrument, index, steps)
      );
      return newDrumPattern;
    });
  };

  const { players, allLoaded } = useSamplePlayers();

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    if (allLoaded) {
      Object.keys(drumPattern).forEach((instrument) => {
        drumPattern[instrument].pattern.forEach((play, index) => {
          if (play) {
            const timeInTicks = index * 48;
            const timingOffset = calculateTimingOffset(
              instrument === "snare"
                ? debouncedPushPullSnare.offset
                : debouncedPushPullHat.offset,
              instrument,
              index,
              instrument === "snare"
                ? debouncedPushPullSnare.steps
                : debouncedPushPullHat.steps
            );
            const offsetTimeInTicks = timeInTicks + timingOffset;
            Tone.Transport.scheduleRepeat(
              (time) => {
                if (players[instrument].loaded) {
                  players[instrument].start(time);
                  setCurrentStep(index);
                }
              },
              "2m",
              Tone.Ticks(offsetTimeInTicks).toSeconds()
            );
          }
        });
      });
    }

    return () => {
      Tone.Transport.cancel(0);
      Object.values(players).forEach((player) => {
        if (player.state === "started") {
          player.dispose();
        }
      });
    };
  }, [allLoaded, debouncedPushPullSnare, debouncedPushPullHat, drumPattern]);

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
      <PushPullKnob
        instrument="hat"
        setPushPull={setPushPull}
        pushPullValue={pushPullHat}
      />
      <DrumPads
        drumPattern={drumPattern}
        currentStep={currentStep}
        instrument="snare"
        onToggleDrumPad={toggleDrumPad}
      />
      <DrumPads
        drumPattern={drumPattern}
        currentStep={currentStep}
        instrument="hat"
        onToggleDrumPad={toggleDrumPad}
      />
      <div>
        <pre>{JSON.stringify(drumPattern, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Groovarium;
