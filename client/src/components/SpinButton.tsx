
import React from "react";

interface SpinButtonProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

const SpinButton: React.FC<SpinButtonProps> = ({ text, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#4CAF50AA" : "#4CAF50", 
        border: "2px solid #2E7D32",
        color: "#FFF",
        fontSize: "18px",
        fontWeight: "bold",
        padding: "12px 24px",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : "0 4px 6px rgba(0,0,0,0.2)",
        transition: "background-color 0.2s",
      }}
    >
      {text}
    </button>
  );
};

export default SpinButton;
