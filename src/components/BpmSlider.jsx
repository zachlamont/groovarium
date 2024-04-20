import React, { useEffect, useState } from 'react';

const BpmSlider = ({ selectedBPM, setSelectedBPM }) => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        const change = event.movementY;  // Modify this if the sensitivity is too high/low
        setSelectedBPM((bpm) => {
          const newBpm = bpm - change;
          return Math.min(200, Math.max(20, newBpm));  // BPM range between 20 and 200
        });
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, setSelectedBPM]);

  const handleMouseDown = () => setIsDragging(true);

  return (
    <div className="relative inline-block text-left">
      <button
        onMouseDown={handleMouseDown}
        className="mt-4 mb-4 w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        BPM: {selectedBPM}
      </button>
    </div>
  );
};

export default BpmSlider;


