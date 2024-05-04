// src/utils/groovarium/useSamplePlayers.js
import { useState, useEffect } from "react";
import * as Tone from "tone";

const useSamplePlayers = (drumPattern, setCurrentStep, selectedSamples) => {
  const [allLoaded, setAllLoaded] = useState(false);

  const players = {
    funk: {
      kick: new Tone.Player("/samples/kick/funk.wav").toDestination(),
      snare: new Tone.Player("/samples/snare/funk.wav").toDestination(),
      hat: new Tone.Player("/samples/hat/funk.wav").toDestination(),
      clap: new Tone.Player("/samples/clap/funk.wav").toDestination(),
    },
    hiphop: {
      kick: new Tone.Player("/samples/kick/hiphop.wav").toDestination(),
      snare: new Tone.Player("/samples/snare/hiphop.wav").toDestination(),
      hat: new Tone.Player("/samples/hat/hiphop.wav").toDestination(),
      clap: new Tone.Player("/samples/clap/hiphop.wav").toDestination(),
    },
  };

  useEffect(() => {
    const loadSamples = async () => {
      await Tone.loaded();
      setAllLoaded(true);
    };

    loadSamples();
  }, []);

  useEffect(() => {
    console.log(selectedSamples); //Correctly returns the selected samples
    console.log(drumPattern); //Correctly returns the drum pattern
    console.log(allLoaded);
    if (allLoaded) {
      Object.keys(drumPattern).forEach((instrument) => {
        drumPattern[instrument].pattern.forEach((play, index) => {
          if (play) {
            const timeInTicks = index * 48;
            const timingOffset = drumPattern[instrument].timingOffsets[index];
            const offsetTimeInTicks = timeInTicks + timingOffset;
            Tone.Transport.scheduleRepeat(
              (time) => {
                if (players[selectedSamples[instrument]][instrument].loaded) {
                  players[selectedSamples[instrument]][instrument].start(time);
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
  }, [allLoaded, drumPattern, selectedSamples]);

  return { players, allLoaded };
};

export default useSamplePlayers;
