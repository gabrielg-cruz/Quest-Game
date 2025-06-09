import React from "react";
import { describeDonutSegment } from "../../utils/math";
import { Category } from "../../types/game";

interface BoardSegmentProps {
  index: number;
  category: Category;
  label: string;
  startAngle: number;
  endAngle: number;
  outerRadius: number;
  innerRadius: number;
  color: string;
  type: "normal" | "start" | "end";
  onClick: () => void;
}

const BoardSegment: React.FC<BoardSegmentProps> = ({
  index,
  category,
  label,
  startAngle,
  endAngle,
  outerRadius,
  innerRadius,
  color,
  type,
  onClick,
}) => {
  const pathData = describeDonutSegment(
    0,
    0,
    outerRadius,
    innerRadius,
    startAngle,
    endAngle
  );

  const midAngle = startAngle + (endAngle - startAngle) / 2;

  const textRadius = innerRadius + (type === "normal" ? 55 : 35);
  const rad = (midAngle * Math.PI) / 180;
  const textX = textRadius * Math.cos(rad);
  const textY = textRadius * Math.sin(rad);

  const baseline = type === "normal" ? "middle" : "text-before-edge";
  const fontSize = type === "normal" ? innerRadius * 0.12 : innerRadius * 0.10;

  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      <path
        d={pathData}
        fill={color}
        stroke="#000"
        strokeWidth={0.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <text
        x={textX}
        y={textY}
        textAnchor="middle"
        dominantBaseline={baseline}
        transform={`rotate(${midAngle}, ${textX}, ${textY})`}
        fill={type === "normal" ? "#FFF" : "#000"}
        fontSize={fontSize}
        style={{ pointerEvents: "none" }}
      >
        {label}
      </text>
    </g>
  );
};

export default BoardSegment;
