// Novo Board.tsx com suporte a casas especiais bicolores
import React from "react";
import BoardSegment from "./BoardSegment";
import Pawn from "./Pawn";
import { BoardProps, Category } from "../../types/game";

const outerRadius = 300;
const innerRadius = 200;
const centerCircleRadius = innerRadius - 30;
const rotationOffset = -90;

const casasEspeciais: Record<number, [Category, Category]> = {
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

  const specialMultiplier = 1.8;
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
          transition: isSpinning ? "transform 2.2s cubic-bezier(0.33, 1, 0.68, 1)" : undefined,
        }}
      >
        <circle cx={0} cy={0} r={innerRadius + 2} fill="#D9423D" />

        {categories.map((cat, idx) => {
          let color = segmentColors[cat];
          let label: string = cat;
          let segmentOuterRadius = outerRadius;
          let type: "normal" | "start" | "end" = "normal";
          let slotWidth = anglePerSlot;

          if (idx === 0) {
            color = "#FFFFFF";
            label = "Início";
            segmentOuterRadius = outerRadius + 80;
            type = "start";
            slotWidth = anglePerSlot * specialMultiplier;
          } else if (idx === totalSegments - 1) {
            color = "#FFFFFF";
            label = "Fim";
            segmentOuterRadius = outerRadius + 80;
            type = "end";
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
              outerRadius={segmentOuterRadius}
              innerRadius={innerRadius}
              color={color}
              type={type}
              onClick={() => onSegmentClick && onSegmentClick(idx)}
              isSpecial={!!casasEspeciais[idx]}
              secondCategory={casasEspeciais[idx]?.[1]}
              categoryColors={segmentColors}
            />
          );
        })}

        <circle cx={0} cy={0} r={centerCircleRadius} fill="url(#gradienteBranco)" />

        {pawns.map((pawn, i) => (
          <Pawn
            key={i}
            segmentIndex={pawn.segmentIndex}
            color={pawn.color}
            size={pawn.size}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            totalSegments={totalSegments}
            rotationOffset={rotationOffset}
          />
        ))}
      </g>
    </svg>
  );
};

export default Board;
