import React from "react";
import { Player } from "../../types/game";

interface PlayerCardProps {
  player: Player;
  isActive: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isActive }) => {
  const { name, avatarUrl, score, tokenColor } = player;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "16px",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          overflow: "hidden",
          border: isActive ? `3px solid ${tokenColor}` : "2px solid #DDD",
        }}
      >
        <img
          src={avatarUrl}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Nome do jogador */}
      <span
        style={{
          marginTop: "6px",
          color: "#FFF",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {name}
      </span>

      {/* Círculos numerados (vidas/pontos) */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          marginTop: "8px",
        }}
      >
        {Array.from({ length: 5 }, (_, i) => {
          const lifeNumber = 5 - i;
          const filled = score >= lifeNumber;
          return (
            <div
              key={i}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: filled ? tokenColor : "#333", // preenchimento igual cor do jogador
                border: `2px solid ${filled ? "#FFF" : "#555"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFF",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {lifeNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerCard;
