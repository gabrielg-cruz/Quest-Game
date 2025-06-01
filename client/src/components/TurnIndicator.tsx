// src/components/TurnIndicator.tsx
import React from "react";

interface TurnIndicatorProps {

  currentTurn: number;
}


const TurnIndicator: React.FC<TurnIndicatorProps> = ({ currentTurn }) => {
  return (
    <div
      style={{
        color: "#fff",
        fontSize: "32px",
        fontWeight: "bold",

      }}
    >
      Turno {currentTurn}
    </div>
  );
};

export default TurnIndicator;
