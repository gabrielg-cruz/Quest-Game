import React from "react";

interface PawnComponentProps {

  segmentIndex: number;
  color: string;
  size: number;
  innerRadius: number;
  outerRadius: number;
  totalSegments: number;
  rotationOffset: number;
}

const Pawn: React.FC<PawnComponentProps> = ({
  segmentIndex,
  color,
  size,
  innerRadius,
  outerRadius,
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

  return (
    <circle
      cx={x}
      cy={y}
      r={size}
      fill={color}
      stroke="#FFF"
      strokeWidth={2}
    />
  );
};

export default Pawn;
