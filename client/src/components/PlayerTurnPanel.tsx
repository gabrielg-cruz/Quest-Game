// src/components/PlayerTurnPanel.tsx
import React from "react";

interface Player {
  id: string;
  name: string;
  avatarUrl: string;
  score: number;
  currentSegment: number;
}

interface PlayerTurnPanelProps {
 
  player: Player;

  onSettingsClick?: () => void;
}

const PlayerTurnPanel: React.FC<PlayerTurnPanelProps> = ({
  player,
  onSettingsClick,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "8px 12px",
        borderRadius: "8px",
      }}
    >
  
      <div style={{ textAlign: "center" }}>
        <img
          src={player.avatarUrl}
          alt={player.name}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "2px solid #FFF",
            objectFit: "cover",
            display: "block",
          }}
        />
        <span
          style={{
            marginTop: "4px",
            display: "block",
            color: "#FFF",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {player.name}
        </span>
      </div>

   
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            color: "#FFF",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Sua vez!
        </span>

      
        <button
          onClick={onSettingsClick}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Configurações"
        >
      
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#FFF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1 -2.83 2.83l-.06-.06a1.65 1.65 0 0 0 -1.82-.33 1.65 1.65 0 0 0 -1 1.51v.18a2 2 0 1 1 -4 0v-.18a1.65 1.65 0 0 0 -1-1.51 1.65 1.65 0 0 0 -1.82.33l-.06.06a2 2 0 1 1 -2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0 -1.51-1H4.21a2 2 0 1 1 0-4h.18a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0 -.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.18a1.65 1.65 0 0 0 1-1.51V4.21a2 2 0 1 1 4 0v.18a1.65 1.65 0 0 0 1 1.51h.18a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0 -.33 1.82v.18a1.65 1.65 0 0 0 1.51 1h.18a2 2 0 1 1 0 4h-.18a1.65 1.65 0 0 0 -1.51 1z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PlayerTurnPanel;
