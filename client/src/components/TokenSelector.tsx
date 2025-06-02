// src/components/TokensSelector.tsx
import React from "react";

interface TokensSelectorProps {
  tokensLeft: number[];
  onSelectToken: (value: number) => void;
  disabled?: boolean;
}

const TokensSelector: React.FC<TokensSelectorProps> = ({
  tokensLeft,
  onSelectToken,
  disabled = false,
}) => {
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      {Array.from({ length: 5 }, (_, idx) => {
        const value = idx + 1;
        const isAvailable = tokensLeft.includes(value);
        return (
          <button
            key={value}
            onClick={() => isAvailable && onSelectToken(value)}
            disabled={!isAvailable || disabled}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: isAvailable ? "#FFD700" : "#555",
              border: isAvailable ? "2px solid #FFF" : "2px solid #333",
              color: "#000",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: isAvailable && !disabled ? "pointer" : "not-allowed",
              opacity: disabled ? 0.6 : 1,
            }}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
};

export default TokensSelector;
