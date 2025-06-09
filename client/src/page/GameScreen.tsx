import React from "react";
import PlayerList from "../components/PlayerList/PlayerList";
import Board from "../components/Board/Board";
import TurnIndicator from "../components/TurnIndicator";
import PlayerTurnPanel from "../components/PlayerTurnPanel";
import CategoryLegend from "../components/Board/CategoryLegend";
import { Player, Category } from "../types/game";

import TokensSelector from "../components/TokenSelector";

const DUMMY_PLAYERS: Player[] = [
  {
    id: "1",
    name: "Jogador 1",
    avatarUrl: "/avatars/avatar1.png",
    score: 5,
    currentSegment: 0,
    tokenColor: "#E74C3C",
    tokensLeft: [1, 2, 3, 4, 5],
  },
  {
    id: "2",
    name: "Jogador 2",
    avatarUrl: "/avatars/avatar2.png",
    score: 3,
    currentSegment: 5,
    tokenColor: "#3498DB",
    tokensLeft: [1, 2, 3, 4, 5],
  },
];

const SEGMENT_CATEGORIES: Category[] = Array.from({ length: 30 }, (_, i) => {
  const sequence: Category[] = ["M", "V", "S", "EL", "AE", "CT"];
  return sequence[i % sequence.length];
});

const CATEGORY_COLORS: Record<Category, string> = {
  M: "#FFE600",
  V: "#FF8C00",
  S: "#9256D2",
  EL: "#35A12C",
  AE: "#D9423D",
  CT: "#1E73BE",
};

const CATEGORY_NAMES: Record<Category, string> = {
  M: "Mundo",
  V: "Variedades",
  S: "Sociedade",
  EL: "Esporte",
  AE: "Artes e Entretenimento",
  CT: "Ciência e Tecnologia",
};

const OUTER_RADIUS = 300;
const INNER_RADIUS = 250;
const ROTATION_OFFSET = 90;
const TOTAL_SEGMENTS = SEGMENT_CATEGORIES.length;

const GameScreen: React.FC = () => {
  const [players, setPlayers] = React.useState<Player[]>(() =>
    DUMMY_PLAYERS.map((p) => ({ ...p }))
  );
  const [currentPlayerId, setCurrentPlayerId] = React.useState(players[0].id);
  const [currentTurn, setCurrentTurn] = React.useState(1);
  const [selectedSegment, setSelectedSegment] = React.useState<number | null>(
    null
  );
  const [isAnswering, setIsAnswering] = React.useState(false);

  const onTokenSelected = (tokenValue: number) => {
    if (isAnswering) return;
    setIsAnswering(true);

    
    const acertou = Math.random() < 0.6;
    setTimeout(() => {
 
      setPlayers((oldPlayers) =>
        oldPlayers.map((p) => {
          if (p.id !== currentPlayerId) return p;
          return {
            ...p,
            tokensLeft: p.tokensLeft.filter((t) => t !== tokenValue),
          };
        })
      );


      if (acertou) {
        setPlayers((oldPlayers) =>
          oldPlayers.map((p) => {
            if (p.id !== currentPlayerId) return p;
            const novaPos =
              (p.currentSegment + tokenValue) % SEGMENT_CATEGORIES.length;
            return {
              ...p,
              currentSegment: novaPos,
            };
          })
        );
        setSelectedSegment(
          (players.find((p) => p.id === currentPlayerId)!.currentSegment +
            tokenValue) %
            SEGMENT_CATEGORIES.length
        );
      } else {
        setSelectedSegment(null);
      }

  
      const currentIndex = players.findIndex((p) => p.id === currentPlayerId);
      const nextIndex = (currentIndex + 1) % players.length;
      const nextPlayer = players[nextIndex];
      setCurrentPlayerId(nextPlayer.id);

      if (nextIndex === 0) {
        setCurrentTurn((t) => t + 1);
      }

      setIsAnswering(false);
    }, 1200);
  };

  const pawns = players.map((p) => ({
    segmentIndex: p.currentSegment,
    color: p.tokenColor,
    size: 24,
    outerRadius: OUTER_RADIUS,
    innerRadius: INNER_RADIUS,
    totalSegments: TOTAL_SEGMENTS,
    rotationOffset: ROTATION_OFFSET,
  }));

  const currentPlayer = players.find((p) => p.id === currentPlayerId)!;

  return (
    <div className="game-screen">
      <div className="game-content">
      
        <div
          style={{
            width: "20%",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PlayerList players={players} currentPlayerId={currentPlayerId} />
        </div>

   
        <div
          style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 16,
              left: "50%",
              transform: "translateX(-52%)",
              zIndex: 2,
            }}
          >
            <TurnIndicator currentTurn={currentTurn} />
          </div>

          <div
            style={{
              position: "absolute",
              top: 16,
              right: "25%",
              zIndex: 2,
            }}
          >
            <PlayerTurnPanel
              player={currentPlayer}
              onSettingsClick={() => alert("Abrir configurações")}
            />
          </div>

          <div className="board-container">
            <Board
              categories={SEGMENT_CATEGORIES}
              segmentColors={CATEGORY_COLORS}
              selectedSegment={selectedSegment ?? undefined}
              onSegmentClick={() => {}}
              pawns={pawns}
            />
          </div>

        </div>

        <div
          style={{
            width: "20%",
            padding: "24px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <CategoryLegend
            categoryNames={CATEGORY_NAMES}
            categoryColors={CATEGORY_COLORS}
          />
        </div>
      </div>
    </div>
  );
};

export default GameScreen;