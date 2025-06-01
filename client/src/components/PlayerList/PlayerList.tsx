// PlayerList.tsx
import React from "react";
import PlayerCard from "./PlayerCard";
import { Player } from "../../types/game";

interface PlayerListProps {
  players: Player[];
  currentPlayerId: string;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, currentPlayerId }) => {
  return (
    <div style={{ color: "#fff" }}>
      {players.map((p) => (
        <PlayerCard
          key={p.id}
          player={p}
          isActive={p.id === currentPlayerId}
        />
      ))}
    </div>
  );
};

export default PlayerList;
