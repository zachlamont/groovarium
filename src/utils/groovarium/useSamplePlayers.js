// src/utils/groovarium/useSamplePlayers.js
import { useState, useEffect } from "react";
import * as Tone from "tone";

const useSamplePlayers = (
  drumPattern,
  setCurrentStep,
  selectedSamples,
  isGhostNotes,
  loopLength
) => {
  const [allLoaded, setAllLoaded] = useState(false);

  const players = {
    funk: {
      kick: new Tone.Player("/samples/kick/funk.wav").toDestination(),
      snare: new Tone.Player("/samples/snare/funk.wav").toDestination(),
      hat: new Tone.Player("/samples/hat/funk.wav").toDestination(),
      clap: new Tone.Player("/samples/clap/funk.wav").toDestination(),
      kick_mv: new Tone.Player("/samples/kick/funk-mv.wav").toDestination(),
      snare_mv: new Tone.Player("/samples/snare/funk-mv.wav").toDestination(),
      hat_mv: new Tone.Player("/samples/hat/funk-mv.wav").toDestination(),
      clap_mv: new Tone.Player("/samples/clap/funk-mv.wav").toDestination(),
    },
    hiphop: {
      kick: new Tone.Player("/samples/kick/hiphop.wav").toDestination(),
      snare: new Tone.Player("/samples/snare/hiphop.wav").toDestination(),
      hat: new Tone.Player("/samples/hat/hiphop.wav").toDestination(),
      clap: new Tone.Player("/samples/clap/hiphop.wav").toDestination(),
      kick_mv: new Tone.Player("/samples/kick/hiphop-mv.wav").toDestination(),
      snare_mv: new Tone.Player("/samples/snare/hiphop-mv.wav").toDestination(),
      hat_mv: new Tone.Player("/samples/hat/hiphop-mv.wav").toDestination(),
      clap_mv: new Tone.Player("/samples/clap/hiphop-mv.wav").toDestination(),
    },
    rock: {
      kick: new Tone.Player("/samples/kick/rock.wav").toDestination(),
      snare: new Tone.Player("/samples/snare/rock.wav").toDestination(),
      hat: new Tone.Player("/samples/hat/rock.wav").toDestination(),
      clap: new Tone.Player("/samples/clap/rock.wav").toDestination(),
      kick_mv: new Tone.Player("/samples/kick/rock-mv.wav").toDestination(),
      snare_mv: new Tone.Player("/samples/snare/rock-mv.wav").toDestination(),
      hat_mv: new Tone.Player("/samples/hat/rock-mv.wav").toDestination(),
      clap_mv: new Tone.Player("/samples/clap/rock-mv.wav").toDestination(),
    },
    jazz: {
      kick: new Tone.Player("/samples/kick/jazz.wav").toDestination(),
      snare: new Tone.Player("/samples/snare/jazz.wav").toDestination(),
      hat: new Tone.Player("/samples/hat/jazz.wav").toDestination(),
      clap: new Tone.Player("/samples/clap/jazz.wav").toDestination(),
      kick_mv: new Tone.Player("/samples/kick/jazz-mv.wav").toDestination(),
      snare_mv: new Tone.Player("/samples/snare/jazz-mv.wav").toDestination(),
      hat_mv: new Tone.Player("/samples/hat/jazz-mv.wav").toDestination(),
      clap_mv: new Tone.Player("/samples/clap/jazz-mv.wav").toDestination(),
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
    if (allLoaded) {
      console.log("the loop length is", loopLength);
      Object.keys(drumPattern).forEach((instrument) => {
        drumPattern[instrument].pattern.forEach((play, index) => {
          // Only schedule the steps within the loop length
          if (index < loopLength * 16) {
            const timeInTicks = index * 48;
            const timingOffset = drumPattern[instrument].timingOffsets[index];
            const offsetTimeInTicks = timeInTicks + timingOffset;

            // Schedule the setCurrentStep for every step (for blue border)
            Tone.Transport.scheduleRepeat(
              () => {
                setCurrentStep(index);
              },
              `${loopLength}m`, // Sets the loop length dynamically
              Tone.Ticks(timeInTicks).toSeconds()
            );

            // Schedule the note playing only if the step is set to play
            if (play) {
              const instrumentName =
                isGhostNotes && index % 2 === 1
                  ? `${instrument}_mv`
                  : instrument;
              Tone.Transport.scheduleRepeat(
                (time) => {
                  if (
                    players[selectedSamples[instrument]][instrumentName].loaded
                  ) {
                    players[selectedSamples[instrument]][instrumentName].start(
                      time
                    );
                  }
                },
                `${loopLength}m`, // Sets the loop length dynamically
                Tone.Ticks(offsetTimeInTicks).toSeconds()
              );
            }
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
  }, [allLoaded, drumPattern, selectedSamples, isGhostNotes]);

  return { players, allLoaded };
};

export default useSamplePlayers;
