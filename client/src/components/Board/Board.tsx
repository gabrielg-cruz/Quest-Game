// src/components/Board/Board.tsx
import React from "react";
import BoardSegment from "./BoardSegment";
import Pawn from "./Pawn";
import { BoardProps } from "../../types/game";

const Board: React.FC<BoardProps> = ({
  categories,
  segmentColors,
  selectedSegment,
  onSegmentClick,
  pawns = [],
  isSpinning = false,
}) => {
  const totalSegments = categories.length;
 
  const outerRadius = 300;
  const innerRadius = 250;
  const centerCircleRadius = innerRadius - 18;
  const rotationOffset = 90;
  const viewBoxSize = (outerRadius + 20) * 2;

 
  const [rotationStyle, setRotationStyle] = React.useState<string>("rotate(0deg)");

  React.useEffect(() => {
    if (isSpinning) {
      
      const finalAngle =
        5 * 360 + (selectedSegment! * (360 / totalSegments) - rotationOffset);
      setRotationStyle(`rotate(${finalAngle}deg)`);
    } else {
      setRotationStyle("rotate(0deg)");
    }
  }, [isSpinning, selectedSegment, totalSegments]);

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
    
        <circle cx={0} cy={0} r={innerRadius + 2} fill="#D9423D" />

    
        {categories.map((cat, idx) => {
        
          const color = idx === 0 ? "#FFFFFF" : segmentColors[cat];
          return (
            <BoardSegment
              key={idx}
              index={idx}
              category={cat}
              totalSegments={totalSegments}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
              color={color}
              isSelected={selectedSegment === idx}
              onClick={() => onSegmentClick && onSegmentClick(idx)}
              rotationOffset={rotationOffset}
            />
          );
        })}

        {/* 3) Círculo central degradê */}
        <circle
          cx={0}
          cy={0}
          r={centerCircleRadius}
          fill="url(#gradienteBranco)"
        />

        <text
          x={0}
          y={innerRadius - 10}
          textAnchor="middle"
          fontSize="14"
          fill="#000"
          transform={`rotate(90, 0, ${innerRadius - 10})`}
        >
          Início | Fim
        </text>

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
