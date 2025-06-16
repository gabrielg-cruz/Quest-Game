// client/src/components/Board/BoardSegment.tsx
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
  isSpecial?: boolean;
  secondCategory?: Category;
  categoryColors?: Record<Category, string>;
}

const BoardSegment: React.FC<BoardSegmentProps> = ({
  category,
  label,
  startAngle,
  endAngle,
  outerRadius,
  innerRadius,
  color,
  type,
  onClick,
  isSpecial = false,
  secondCategory,
  categoryColors,
}) => {
  const midAngle = (startAngle + endAngle) / 2;
  const fontSize = type === "normal" ? innerRadius * 0.12 : innerRadius * 0.14;
  const angleRad = (midAngle * Math.PI) / 180;

  // Encolhe fatias de Início e Fim em 15%
  const shrinkFactor = (type === "start" || type === "end") ? 0.85 : 1;
  const adjOuter = outerRadius * shrinkFactor;
  const adjInner = innerRadius * shrinkFactor;

  // posições recalculadas usando valores encolhidos
  const halfRadius = (adjOuter + adjInner) / 2;
  const centerX = halfRadius * Math.cos(angleRad);
  const centerY = halfRadius * Math.sin(angleRad);

  // ajuste para legendas em fatias especiais
  const topR = halfRadius + 24 * shrinkFactor;
  const botR = halfRadius - 24 * shrinkFactor;

  const textX = (r: number) => r * Math.cos(angleRad);
  const textY = (r: number) => r * Math.sin(angleRad);

  // gera o path do arco com raios ajustados
  const pathData = describeDonutSegment(
    0,
    0,
    adjOuter,
    adjInner,
    startAngle,
    endAngle
  );

  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      {(type === "start" || type === "end") ? (
        <>
          <path d={pathData} fill="#FFF" stroke="#000" strokeWidth={1.5} />
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${midAngle}, ${centerX}, ${centerY})`}
            fill="#000"
            fontSize={fontSize}
            style={{ pointerEvents: "none" }}
          >
            {label}
          </text>
        </>
      ) : isSpecial && secondCategory && categoryColors ? (
        <>
          <path
            d={describeDonutSegment(
              0,
              0,
              adjOuter,
              (adjOuter + adjInner) / 2,
              startAngle,
              endAngle
            )}
            fill={categoryColors[category]}
            stroke="#000"
            strokeWidth={0.5}
          />
          <path
            d={describeDonutSegment(
              0,
              0,
              (adjOuter + adjInner) / 2,
              adjInner,
              startAngle,
              endAngle
            )}
            fill={categoryColors[secondCategory]}
            stroke="#000"
            strokeWidth={0.5}
          />
          <text
            x={textX(topR)}
            y={textY(topR)}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${midAngle}, ${textX(topR)}, ${textY(topR)})`}
            fill="#FFF"
            fontSize={fontSize - 2}
            style={{ pointerEvents: "none" }}
          >
            {category}
          </text>
          <text
            x={textX(botR)}
            y={textY(botR)}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${midAngle}, ${textX(botR)}, ${textY(botR)})`}
            fill="#FFF"
            fontSize={fontSize - 2}
            style={{ pointerEvents: "none" }}
          >
            {secondCategory}
          </text>
        </>
      ) : (
        <>
          <path d={pathData} fill={color} stroke="#000" strokeWidth={0.5} />
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${midAngle}, ${centerX}, ${centerY})`}
            fill="#FFF"
            fontSize={fontSize - 2}
            style={{ pointerEvents: "none" }}
          >
            {label}
          </text>
        </>
      )}
    </g>
  );
};

export default BoardSegment;
