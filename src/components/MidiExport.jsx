import React from "react";
import { Midi } from "@tonejs/midi";

const MidiExport = ({ drumPattern, isGhostNotes, loopLength, bpm }) => {
  const instrumentMidiNumbers = {
    kick: 36,
    snare: 38,
    hat: 42,
    clap: 39,
  };

  const handleClick = () => {
    const midi = new Midi();
    midi.header.setTempo(bpm); // Set the tempo
    const track = midi.addTrack();
    track.channel = 9; // Set the channel to 9 for drum kit
    const PPQ = 192; // Pulses per quarter note

    for (const instrument in drumPattern) {
      const { pattern, timingOffsets } = drumPattern[instrument];
      const midiNumber = instrumentMidiNumbers[instrument];

      for (let i = 0; i < pattern.length; i++) {
        if (i >= loopLength * 16) break;

        if (pattern[i]) {
          const timeInTicks = i * 48 + timingOffsets[i];
          const timeInSeconds = timeInTicks / ((bpm / 60) * PPQ);
          const velocity = isGhostNotes && i % 2 === 0 ? 0.4 : 0.6;

          track.addNote({
            midi: midiNumber,
            time: timeInSeconds,
            duration: 48 / ((bpm / 60) * PPQ),
            velocity,
          });
        }
      }
    }

    const midiArray = new Uint8Array(midi.toArray());
    const blob = new Blob([midiArray], { type: "audio/midi" });
    const url = URL.createObjectURL(blob);
    const fileName = "drumPattern.mid";

    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  return <button onClick={handleClick}>Export MIDI</button>;
};

export default MidiExport;

//In this component, we have a  handleClick  function that creates a new MIDI file using the  @tonejs/midi  library. We loop through each instrument in the  drumPattern  object and add notes to the MIDI track based on the pattern and timing offsets. We set the tempo, MIDI number, time, duration, and velocity for each note. Finally, we create a Blob object from the MIDI data, create a download link, and simulate a click event to download the file.
//Now we can import the  MidiExport  component in the  App  component and pass the required props to it.
