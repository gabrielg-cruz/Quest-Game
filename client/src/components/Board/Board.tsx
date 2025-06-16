// client/src/components/Board/Board.tsx
import React from "react";
import BoardSegment from "./BoardSegment";
import Pawn from "./Pawn";
import { BoardProps, Category, PawnProps } from "../../types/game";

const outerRadius = 300;
const innerRadius = 200;
const centerCircleRadius = innerRadius - 30;
const rotationOffset = -90;

// Índices das casas especiais com duas categorias
const specialTiles: Record<number, [Category, Category]> = {
  7: ["CT", "EL"],
  9: ["AE", "M"],
  11: ["EL", "S"],
  16: ["S", "CT"],
};

const Board: React.FC<BoardProps> = ({
  categories,
  segmentColors,
  selectedSegment,
  onSegmentClick,
  pawns = [],
  isSpinning = false,
}) => {
  const totalSegments = categories.length;
  // Ajuste dinâmico do multiplier para Início/Fim conforme quantidade de casas
  const specialMultiplier = totalSegments < 12 ? 1.1 : 1.8;
  const effectiveSlots = totalSegments - 2 + 2 * specialMultiplier;
  const anglePerSlot = 360 / effectiveSlots;
  const viewBoxSize = (outerRadius + 40) * 2;

  const [rotationStyle, setRotationStyle] = React.useState<string>("rotate(0deg)");
  React.useEffect(() => {
    if (isSpinning && selectedSegment != null) {
      const finalAngle = 5 * 360 + (selectedSegment * anglePerSlot - rotationOffset);
      setRotationStyle(`rotate(${finalAngle}deg)`);
    } else {
      setRotationStyle("rotate(0deg)");
    }
  }, [isSpinning, selectedSegment, anglePerSlot]);

  let accumulatedAngle = 0;

  // Agrupa pawns por segmento para espaçar se houver mais de um
  const pawnsBySegment: Record<number, PawnProps[]> = {};
  pawns.forEach((pawn) => {
    if (!pawnsBySegment[pawn.segmentIndex]) {
      pawnsBySegment[pawn.segmentIndex] = [];
    }
    pawnsBySegment[pawn.segmentIndex].push(pawn);
  });

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`-${viewBoxSize / 2} -${viewBoxSize / 2} ${viewBoxSize} ${viewBoxSize}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id="gradienteBranco" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="100%" stopColor="#EEE" />
        </radialGradient>
      </defs>

      <g
        style={{
          transform: rotationStyle,
          transformOrigin: "0 0",
          transition: isSpinning
            ? "transform 2.2s cubic-bezier(0.33, 1, 0.68, 1)"
            : undefined,
        }}
      >
        {/* Fundo do donut */}
        <circle cx={0} cy={0} r={innerRadius + 2} fill="#D9423D" />

        {/* Segmentos */}
        {categories.map((cat, idx) => {
          let color = segmentColors[cat];
          let label : string = cat;
          let segmentOuter = outerRadius;
          let slotWidth = anglePerSlot;
          let type: "normal" | "start" | "end" = "normal";

          if (idx === 0) {
            type = "start";
            label = "Início";
            color = "#FFF";
            segmentOuter = outerRadius + 80;
            slotWidth = anglePerSlot * specialMultiplier;
          } else if (idx === totalSegments - 1) {
            type = "end";
            label = "Fim";
            color = "#FFF";
            segmentOuter = outerRadius + 80;
            slotWidth = anglePerSlot * specialMultiplier;
          }

          const startAngle = accumulatedAngle - rotationOffset;
          const endAngle = accumulatedAngle + slotWidth - rotationOffset;
          accumulatedAngle += slotWidth;

          return (
            <BoardSegment
              key={idx}
              index={idx}
              category={cat}
              label={label}
              startAngle={startAngle}
              endAngle={endAngle}
              outerRadius={segmentOuter}
              innerRadius={innerRadius}
              color={color}
              type={type}
              onClick={() => onSegmentClick?.(idx)}
              isSpecial={!!specialTiles[idx]}
              secondCategory={specialTiles[idx]?.[1]}
              categoryColors={segmentColors}
            />
          );
        })}

        {/* Círculo interno */}
        <circle
          cx={0}
          cy={0}
          r={centerCircleRadius}
          fill="url(#gradienteBranco)"
        />

        {/* Peões agrupados e espaçados */}
        {Object.entries(pawnsBySegment).flatMap(([seg, group]) => {
          const segmentIndex = Number(seg);
          const count = group.length;
          // separação de 20% do slot
          const sep = anglePerSlot * 0.2;
          return group.map((pawn, i) => {
            // desloca cada peão para não sobrepor
            const offset = (i - (count - 1) / 2) * sep;
            return (
              <Pawn
                key={`${segmentIndex}-${i}`}
                {...pawn}
                angleOffset={offset}
              />
            );
          });
        })}
      </g>
    </svg>
  );
};

export default Board;
