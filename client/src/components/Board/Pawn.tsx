import React from "react";
import { PawnProps } from "../../types/game";

const Pawn: React.FC<PawnProps> = ({
  segmentIndex,
  color,
  size,
  innerRadius,
  totalSegments,
  rotationOffset,
}) => {
  const anglePerSegment = 360 / totalSegments;
  const startAngle = segmentIndex * anglePerSegment - rotationOffset;
  const endAngle = (segmentIndex + 1) * anglePerSegment - rotationOffset;
  const midAngle = startAngle + (endAngle - startAngle) / 2;

  const radius = innerRadius + 10;
  const rad = (midAngle * Math.PI) / 180;
  const x = radius * Math.cos(rad);
  const y = radius * Math.sin(rad);

  const r = size / 2;

  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      fill={color}
      stroke="#FFF"
      strokeWidth={2}
      pointerEvents="none"
    />
  );
};

export default Pawn;
