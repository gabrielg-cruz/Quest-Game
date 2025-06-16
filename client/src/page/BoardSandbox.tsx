// client/src/pages/BoardSandbox.tsx
import React from "react";
import BoardView from "../components/BoardView/BoardView";
import { Board } from "../models/Board";
import { PlayerState } from "../models/PlayerState";
import { Player } from "../models/Player";

// 1) board fake usando a classe
const fakeBoard = new Board({
  id: 1,
  name: "Teste",
  cols: 6,
  rows: 6,
  tiles: Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    sequence: i + 1,
    col: i % 6,
    row: Math.floor(i / 6),
    themes: [{ id: 1 + (i % 6), code: ["M","V","S","EL","AE","CT"][i % 6], name: "Tema"+(i%6+1), free: true, cost: 0 }],
  })),
  themes: undefined,
});

// 2) playerStates fake usando a classe
const fakePlayerStates = [
  new PlayerState({ playerId: 1, tileId: 5, tokens: [1,2,3], isCurrentTurn: true, pendingQuestion: undefined, pendingSteps: undefined, abilities: {}, pendingAbilityEffect: null }),
  new PlayerState({ playerId: 2, tileId: 18, tokens: [1,2,3], isCurrentTurn: false, pendingQuestion: undefined, pendingSteps: undefined, abilities: {}, pendingAbilityEffect: null }),
];

// 3) players fake
const fakePlayers: Player[] = [
  new Player({ id: 1, name: "Alice", email: "a@b.com", balance: 100, themeIds: [], avatarIndex: 0 }),
  new Player({ id: 2, name: "Bob",   email: "b@b.com", balance: 50,  themeIds: [], avatarIndex: 1 }),
];

export default function BoardSandbox() {
  return (
    <div style={{ width: 600, height: 600, margin: "auto", background: "#181818", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <BoardView
        board={fakeBoard}
        playerStates={fakePlayerStates}
        players={fakePlayers}
      />
    </div>
  );
}
