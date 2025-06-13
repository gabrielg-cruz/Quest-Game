// BoardSegment.tsx restaurado: apenas textos para Início e Fim, sem círculo
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
  isSpecial = false,
  secondCategory,
  categoryColors,
}) => {
  const fullAngle = endAngle - startAngle;
  const midAngle = (startAngle + endAngle) / 2;
  const fontSize = type === "normal" ? innerRadius * 0.12 : innerRadius * 0.14;

  const angleRad = (midAngle * Math.PI) / 180;
  const centerX = ((outerRadius + innerRadius) / 2) * Math.cos(angleRad);
  const centerY = ((outerRadius + innerRadius) / 2) * Math.sin(angleRad);

  const topRadius = (outerRadius + innerRadius) / 2 + 24;
  const bottomRadius = (outerRadius + innerRadius) / 2 - 24;

  const textX = (r: number) => r * Math.cos(angleRad);
  const textY = (r: number) => r * Math.sin(angleRad);

  const pathData = describeDonutSegment(0, 0, outerRadius, innerRadius, startAngle, endAngle);

  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      {(type === "start" || type === "end") ? (
        <>
          <path
            d={pathData}
            fill="#FFFFFF"
            stroke="#000"
            strokeWidth={1.5}
          />

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
            d={describeDonutSegment(0, 0, outerRadius, (outerRadius + innerRadius) / 2, startAngle, endAngle)}
            fill={categoryColors[category]}
            stroke="#000"
            strokeWidth={0.5}
          />

          <path
            d={describeDonutSegment(0, 0, (outerRadius + innerRadius) / 2, innerRadius, startAngle, endAngle)}
            fill={categoryColors[secondCategory]}
            stroke="#000"
            strokeWidth={0.5}
          />

          <text
            x={textX(topRadius)}
            y={textY(topRadius)}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${midAngle}, ${textX(topRadius)}, ${textY(topRadius)})`}
            fill="#FFF"
            fontSize={fontSize - 2}
            style={{ pointerEvents: "none" }}
          >
            {category}
          </text>

          <text
            x={textX(bottomRadius)}
            y={textY(bottomRadius)}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${midAngle}, ${textX(bottomRadius)}, ${textY(bottomRadius)})`}
            fill="#FFF"
            fontSize={fontSize - 2}
            style={{ pointerEvents: "none" }}
          >
            {secondCategory}
          </text>
        </>
      ) : (
        <>
          <path
            d={pathData}
            fill={color}
            stroke="#000"
            strokeWidth={0.5}
          />

          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${midAngle}, ${centerX}, ${centerY})`}
            fill={"#FFF"}
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
