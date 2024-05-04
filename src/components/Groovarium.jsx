import React, { useState, useEffect } from "react";
import PlayButton from "./PlayButton";
import * as Tone from "tone";
import BpmSlider from "./BpmSlider";

import useSamplePlayers from "../utils/groovarium/useSamplePlayers";
import PushPullKnob from "./PushPullKnob";
import { calculateTimingOffset } from "../utils/groovarium/calculateTimingOffset";
import { drumPattern as drumPatternConstant } from "../constants/groovarium";
import DrumPads from "./DrumPads";
import HumanizeKnob from "./HumanizeKnob";
import SwingControl from "./SwingControl";
import SelectGhostNotes from "./SelectGhostNotes";
import SampleSelector from "./SampleSelector";

const Groovarium = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [selectedSamples, setSelectedSamples] = useState({
    kick: "funk",
    snare: "funk",
    hat: "funk",
    clap: "funk",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isGhostNotes, setIsGhostNotes] = useState(false);
  const [drumPattern, setDrumPattern] = useState({ ...drumPatternConstant });
  const [pushPullSnare, setPushPullSnare] = useState({
    offset: 0,
    steps: "1/8",
  });
  const [pushPullHat, setPushPullHat] = useState({
    offset: 0,
    steps: "1/8",
  });
  const [pushPullClap, setPushPullClap] = useState({
    offset: 0,
    steps: "1/8",
  });
  const [amount, setAmount] = useState(0);
  const [toggledInstruments, setToggledInstruments] = useState({
    kick: false,
    snare: false,
    hat: false,
    clap: false,
  });

  const [swingAmount, setSwingAmount] = useState(0);
  const [swingToggledInstruments, setSwingToggledInstruments] = useState({
    kick: true,
    snare: true,
    hat: true,
    clap: true,
  });
  const [swing8Amount, setSwing8Amount] = useState(0);
  const [swing8ToggledInstruments, setSwing8ToggledInstruments] = useState({
    kick: true,
    snare: true,
    hat: true,
    clap: true,
  });

  const setPushPull = (instrument, value, steps) => {
    if (instrument === "snare") {
      setPushPullSnare({ offset: value, steps: steps });
    } else if (instrument === "hat") {
      setPushPullHat({ offset: value, steps: steps });
    } else if (instrument === "clap") {
      setPushPullClap({ offset: value, steps: steps });
    }

    setDrumPattern((prevDrumPattern) => {
      console.log("setdumpaty called");
      const newDrumPattern = { ...prevDrumPattern };
      newDrumPattern[instrument].timingOffsets = newDrumPattern[
        instrument
      ].pattern.map((_, index) => {
        console.log(
          `Value: ${value}, Instrument: ${instrument}, Index: ${index}, Steps: ${steps}`
        ); // Add this line
        return calculateTimingOffset(
          value,
          instrument,
          index,
          steps,
          amount,
          toggledInstruments,
          swingAmount,
          swingToggledInstruments,
          swing8Amount,
          swing8ToggledInstruments
        );
      });
      return newDrumPattern;
    });
  };

  const { players, allLoaded } = useSamplePlayers(
    drumPattern,
    setCurrentStep,
    selectedSamples
  );

  const toggleInstrument = (instrument) => {
    setToggledInstruments((prev) => ({
      ...prev,
      [instrument]: !prev[instrument],
    }));
  };

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    setDrumPattern((prevDrumPattern) => {
      const newDrumPattern = { ...prevDrumPattern };
      Object.keys(newDrumPattern).forEach((instrument) => {
        newDrumPattern[instrument].timingOffsets = newDrumPattern[
          instrument
        ].pattern.map((_, index) => {
          return calculateTimingOffset(
            newDrumPattern[instrument].offset,
            instrument,
            index,
            newDrumPattern[instrument].steps,
            amount,
            toggledInstruments,
            swingAmount,
            swingToggledInstruments,
            swing8Amount,
            swing8ToggledInstruments
          );
        });
      });
      return newDrumPattern;
    });
  }, [
    amount,
    toggledInstruments,
    swingAmount,
    swingToggledInstruments,
    swing8Amount,
    swing8ToggledInstruments,
  ]);

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
    console.log("toggle drum pad called at", instrument, index);
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
      <SelectGhostNotes
        isGhostNotes={isGhostNotes}
        setIsGhostNotes={setIsGhostNotes}
      />
      <SampleSelector
        selectedSamples={selectedSamples}
        setSelectedSamples={setSelectedSamples}
      />
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
      <PushPullKnob
        instrument="clap"
        setPushPull={setPushPull}
        pushPullValue={pushPullClap}
      />
      <SwingControl
        swingAmount={swingAmount}
        setSwingAmount={setSwingAmount}
        swingToggledInstruments={swingToggledInstruments}
        setSwingToggledInstruments={setSwingToggledInstruments}
        swing8Amount={swing8Amount}
        setSwing8Amount={setSwing8Amount}
        swing8ToggledInstruments={swing8ToggledInstruments}
        setSwing8ToggledInstruments={setSwing8ToggledInstruments}
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
      <DrumPads
        drumPattern={drumPattern}
        currentStep={currentStep}
        instrument="clap"
        onToggleDrumPad={toggleDrumPad}
      />
      <DrumPads
        drumPattern={drumPattern}
        currentStep={currentStep}
        instrument="kick"
        onToggleDrumPad={toggleDrumPad}
      />
      <HumanizeKnob
        amount={amount}
        setAmount={setAmount}
        toggledInstruments={toggledInstruments}
        toggleInstrument={toggleInstrument}
      />
      <div>
        <pre>{JSON.stringify(drumPattern, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Groovarium;
