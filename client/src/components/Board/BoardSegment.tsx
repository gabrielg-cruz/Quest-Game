// src/components/Board/BoardSegment.tsx
import React from "react";
import { describeDonutSegment } from "../../utils/math";
import { Category } from "../../types/game";

interface BoardSegmentProps {
  index: number;
  category: Category;
  totalSegments: number;
  outerRadius: number;
  innerRadius: number;
  color: string;
  isSelected: boolean;
  onClick: () => void;
  rotationOffset: number;
}

const BoardSegment: React.FC<BoardSegmentProps> = ({
  index,
  category,
  totalSegments,
  outerRadius,
  innerRadius,
  color,
  isSelected,
  onClick,
  rotationOffset,
}) => {
  const anglePerSegment = 360 / totalSegments;
  const startAngle = index * anglePerSegment - rotationOffset;
  const endAngle = (index + 1) * anglePerSegment - rotationOffset;

  const pathData = describeDonutSegment(
    0,
    0,
    outerRadius,
    innerRadius,
    startAngle,
    endAngle
  );

  // Posição para o texto (sigla)
  const midAngle = startAngle + (endAngle - startAngle) / 2;
  const textRadius = (outerRadius + innerRadius) / 2;
  const rad = (midAngle * Math.PI) / 180;
  const textX = textRadius * Math.cos(rad);
  const textY = textRadius * Math.sin(rad);

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
      {index !== 0 && (
        <text
          x={textX}
          y={textY}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${midAngle}, ${textX}, ${textY})`}
          fill="#FFF"
          fontSize={innerRadius * 0.12}
          style={{ pointerEvents: "none" }}
        >
          {category}
        </text>
      )}
      {/* NÃO desenhamos texto no índice 0 (fatia branca), pois ali vai o “Início | Fim” */}
    </g>
  );
};

export default BoardSegment;
