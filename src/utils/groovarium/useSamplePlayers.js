// src/utils/groovarium/useSamplePlayers.js
import { useState } from "react";
import * as Tone from "tone";

const useSamplePlayers = () => {
  const [allLoaded, setAllLoaded] = useState(false);

  const players = {
    kick: new Tone.Player("/samples/bass.wav", checkLoaded).toDestination(),
    snare: new Tone.Player("/samples/snare.wav", checkLoaded).toDestination(),
    hat: new Tone.Player("/samples/hat.wav", checkLoaded).toDestination(),
    clap: new Tone.Player("/samples/clap.wav", checkLoaded).toDestination(),
  };

  function checkLoaded() {
    if (Object.values(players).every((player) => player.loaded)) {
      setAllLoaded(true);
    }
  }

  return { players, allLoaded };
};

export default useSamplePlayers;