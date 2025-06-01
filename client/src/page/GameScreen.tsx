import React from "react";
import PlayerList from "../components/PlayerList/PlayerList";
import Board from "../components/Board/Board";
import TurnIndicator from "../components/TurnIndicator";
import PlayerTurnPanel from "../components/PlayerTurnPanel";
import CategoryLegend from "../components/Board/CategoryLegend";
import SpinButton from "../components/SpinButton"; 
import { Player, Category } from "../types/game";
import avatar1 from "../assets/avatar1.png"
import avatar2 from "../assets/avatar2.png"

const DUMMY_PLAYERS: Player[] = [
  {
    id: "1",
    name: "Jogador 1",
    avatarUrl: avatar1,
    score: 5,
    currentSegment: 0,
    tokenColor: "#E74C3C",
  },
  {
    id: "2",
    name: "Jogador 2",
    avatarUrl: avatar2,
    score: 3,
    currentSegment: 5,
    tokenColor: "#3498DB",
  },
  // … outros jogadores
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

const GameScreen: React.FC = () => {
  const [currentTurn, setCurrentTurn] = React.useState(1);
  const [currentPlayerId, setCurrentPlayerId] = React.useState("1");
  const [selectedSegment, setSelectedSegment] = React.useState<number | null>(
    null
  );
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [pawns, setPawns] = React.useState<{ id: string; segment: number }[]>(
    () => DUMMY_PLAYERS.map((p) => ({ id: p.id, segment: p.currentSegment }))
  );

  
  const handleSpin = () => {
    if (isSpinning) return; 
    setIsSpinning(true);


    const randomSegment = Math.floor(Math.random() * 30);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedSegment(randomSegment);

     
      setPawns((old) =>
        old.map((pawn) =>
          pawn.id === currentPlayerId ? { ...pawn, segment: randomSegment } : pawn
        )
      );

     
      const currentIndex = DUMMY_PLAYERS.findIndex(
        (p) => p.id === currentPlayerId
      );
      const nextPlayer =
        DUMMY_PLAYERS[(currentIndex + 1) % DUMMY_PLAYERS.length];
      setCurrentPlayerId(nextPlayer.id);
      if (nextPlayer.id === DUMMY_PLAYERS[0].id) {
      
        setCurrentTurn((t) => t + 1);
      }
    }, 2200); 
  };

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
          <PlayerList
            players={DUMMY_PLAYERS}
            currentPlayerId={currentPlayerId}
          />
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
              player={DUMMY_PLAYERS.find((p) => p.id === currentPlayerId)!}
              onSettingsClick={() => alert("Abrir configurações")}
            />
          </div>

        
          <div className="board-container">
            <Board
              categories={SEGMENT_CATEGORIES}
              segmentColors={CATEGORY_COLORS}
              selectedSegment={selectedSegment ?? undefined}
              onSegmentClick={(idx) => {
                
                console.log("Clicou no segmento:", idx);
              }}
              pawns={pawns.map((pawn) => {
                const playerData = DUMMY_PLAYERS.find(
                  (p) => p.id === pawn.id
                )!;
                return {
                  segmentIndex: pawn.segment,
                  color: playerData.tokenColor,
                  size: 12,
                };
              })}
              isSpinning={isSpinning}
            />
          </div>

          
          <div style={{ marginTop: "24px", zIndex: 2 }}>
            <SpinButton
              disabled={isSpinning}
              onClick={handleSpin}
              text="Girar"
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
