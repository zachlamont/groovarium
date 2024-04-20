import React, { useState, useEffect } from "react";
import PlayButton from "./PlayButton";
import * as Tone from "tone";
import BpmSlider from "./BpmSlider";
import { drumPattern } from "../constants/groovarium";

const Groovarium = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [bpm, setBpm] = useState(120); // Default BPM

  // Players setup with onload callback
  const players = {
    kick: new Tone.Player("/samples/bass.wav", checkLoaded).toDestination(),
    snare: new Tone.Player("/samples/snare.wav", checkLoaded).toDestination(),
    hat: new Tone.Player("/samples/hat.wav", checkLoaded).toDestination(),
    clap: new Tone.Player("/samples/clap.wav", checkLoaded).toDestination(),
  };

  function checkLoaded() {
    // Check if all players are loaded
    if (Object.values(players).every((player) => player.loaded)) {
      setAllLoaded(true); // Update state to true when all samples are loaded
    }
  }

  // This useEffect will update the BPM in Tone.Transport whenever bpm state changes
  useEffect(() => {
    Tone.Transport.bpm.value = bpm; // Set the BPM value
  }, [bpm]);

  useEffect(() => {
    if (allLoaded) {
      Object.keys(drumPattern).forEach((instrument) => {
        drumPattern[instrument].forEach((play, index) => {
          if (play) {
            const timeInTicks = index * 48; // Tone.js defaults to 192 ppq, which is equal to 96 ticks per sixteenth note
            Tone.Transport.scheduleRepeat(
              (time) => {
                players[instrument].start(time);
              },
              "1m", // Repeat after 2 measures
              Tone.Ticks(timeInTicks).toSeconds()
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
  }, [allLoaded]); // Dependency on allLoaded

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
    </div>
  );
};

export default Groovarium;
