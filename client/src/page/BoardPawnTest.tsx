// client/src/pages/BoardPawnTest.tsx
import React from "react";
import Board from "../components/Board/Board";
import { Category, PawnProps } from "../types/game";
import { getAvatarUrl } from "../utils/avatar";

export default function BoardPawnTest() {
  // 24 casas para simular o tabuleiro real
  const CATS: Category[] = [
    "M","V","S","EL","AE","CT",
    "M","V","S","EL","AE","CT",
    "M","V","S","EL","AE","CT",
    "M","V","S","EL","AE","CT",
  ] as Category[];

  const COLORS: Record<Category, string> = {
    M: "#FFE600", V: "#FF8C00", S: "#9256D2",
    EL: "#35A12C", AE: "#D9423D", CT: "#1E73BE",
  };

  // Exemplos de peões usando diferentes avatares, dois juntos na casa inicial (segmentIndex: 0)
  const pawns: PawnProps[] = [
  {
    segmentIndex: 0,
    size: 28,
    innerRadius: 200,
    outerRadius: 300,
    totalSegments: CATS.length,
    rotationOffset: -90,
    angleOffset: -12,
    radialOffset: -16,
    avatarUrl: getAvatarUrl(0),
    color: "transparent", // Adicionado aqui!
  },
  {
    segmentIndex: 0,
    size: 28,
    innerRadius: 200,
    outerRadius: 300,
    totalSegments: CATS.length,
    rotationOffset: -90,
    angleOffset: 12,
    radialOffset: 16,
    avatarUrl: getAvatarUrl(1),
    color: "transparent",
  },
  // ...os demais pawns, todos com color: "transparent"
];

  return (
    <div
      style={{
        width: 600,
        height: 600,
        background: "#181818",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Board
        categories={CATS}
        segmentColors={COLORS}
        pawns={pawns}
        isSpinning={false}
      />
    </div>
  );
}
