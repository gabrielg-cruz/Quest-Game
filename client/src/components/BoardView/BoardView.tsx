// client/src/components/Board/BoardView.tsx
import React from "react";
import Board from "../Board/Board";
import { Board as BoardModel } from "../../models/Board";
import { PlayerState } from "../../models/PlayerState";
import { PlayerProps } from "../../models/Player";
import { Category } from "../../types/game";
import { getAvatarUrl } from "../../utils/avatar";

interface BoardViewProps {
  board: BoardModel;
  playerStates: PlayerState[];
  players: PlayerProps[];
  selectedSegment?: number;
  onSegmentClick?: (idx: number) => void;
  isSpinning?: boolean;
}

const CATEGORY_COLORS: Record<Category, string> = {
  M: "#FFE600",
  V: "#FF8C00",
  S: "#9256D2",
  EL: "#35A12C",
  AE: "#D9423D",
  CT: "#1E73BE",
};

export default function BoardView({
  board,
  playerStates,
  players,
  selectedSegment,
  onSegmentClick,
  isSpinning = false,
}: BoardViewProps) {
  // Sequência de categorias
  const categories: Category[] = board.tiles.map(t => t.themes[0].code as Category);
  const segmentColors = { ...CATEGORY_COLORS };

  // Agrupa pawns por casa/segmento
  type PawnBase = {
    segmentIndex: number;
    avatarUrl: string;
  };
  const pawnsRaw: PawnBase[] = playerStates.map(ps => {
    const tileIdx = board.tiles.findIndex(t => t.id === ps.tileId);
    const player = players.find(p => p.id === ps.playerId);
    return {
      segmentIndex: tileIdx >= 0 ? tileIdx : 0,
      avatarUrl: getAvatarUrl(player?.avatarIndex),
    };
  });

  // Agrupa por segmento e aplica offsets para evitar sobreposição
  const pawns: any[] = [];
  const pawnsBySegment: Record<number, PawnBase[]> = {};
  pawnsRaw.forEach(pawn => {
    if (!pawnsBySegment[pawn.segmentIndex]) pawnsBySegment[pawn.segmentIndex] = [];
    pawnsBySegment[pawn.segmentIndex].push(pawn);
  });

  const totalSegments = categories.length;
  const innerRadius = 200;
  const outerRadius = 300;

  Object.entries(pawnsBySegment).forEach(([segmentIndex, group]) => {
    const idx = Number(segmentIndex);
    const count = group.length;
    const sep = 16; // quanto maior, mais separados radialmente
    group.forEach((pawn, i) => {
      pawns.push({
        segmentIndex: idx,
        size: 28,
        innerRadius,
        outerRadius,
        totalSegments,
        rotationOffset: -90,
        avatarUrl: pawn.avatarUrl,
        angleOffset: count > 1 ? (i - (count - 1) / 2) * 10 : 0, // levemente separados angularmente
        radialOffset: count > 1 ? (i % 2 === 0 ? -sep : sep) : 0, // alterna para cima/baixo
      });
    });
  });

  return (
    <div style={{ width: "100%", height: "100%", minWidth: 500, minHeight: 500 }}>
      <Board
        categories={categories}
        segmentColors={segmentColors}
        selectedSegment={selectedSegment}
        onSegmentClick={onSegmentClick}
        pawns={pawns}
        isSpinning={isSpinning}
      />
    </div>
  );
}
