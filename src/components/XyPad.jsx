import React, { useState, useEffect, useRef } from "react";
//import debounce from "lodash.debounce";

const Pad = ({ width, height, onChange, swingAmount, swing8Amount }) => {
  const padRef = useRef(null);
  const [position, setPosition] = useState({
    x: swingAmount,
    y: height - swing8Amount,
  });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setPosition({ x: swingAmount, y: height - swing8Amount });

    const handleMouseMove = (event) => {
      if (dragging) {
        requestAnimationFrame(() => {
          const rect = padRef.current.getBoundingClientRect();
          let newX = event.clientX - rect.left;
          let newY = height - (event.clientY - rect.top); // Reverse the Y-coordinate

          // Constrain the handle within the pad boundaries
          newX = Math.max(0, Math.min(newX, width));
          newY = Math.max(0, Math.min(newY, height));

          setPosition({ x: newX, y: height - newY }); // Store position with inverted Y
          onChange({ x: newX / width, y: newY / height }); // Normalize newY before sending
        });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, width, height, onChange, swingAmount, swing8Amount]);

  const handleMouseDown = (event) => {
    setDragging(true);
    handleMouseMove(event);
  };

  return (
    <div
      ref={padRef}
      style={{ width, height, position: "relative", backgroundColor: "#EEE" }}
      onMouseDown={handleMouseDown}
    >
      <div
        style={{
          position: "absolute",
          top: position.y, // Use stored Y-position that's already inverted
          left: position.x,
          width: 20,
          height: 20,
          backgroundColor: "blue",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          cursor: "grab",
        }}
      />
    </div>
  );
};

export default Pad;
