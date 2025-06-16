// client/src/components/Board/Pawn.tsx
import React from "react";
import { PawnProps } from "../../types/game";

interface PawnExtendedProps extends PawnProps {
  angleOffset?: number;
  radialOffset?: number;
  avatarUrl: string;
}

const Pawn: React.FC<PawnExtendedProps> = ({
  segmentIndex,
  size,
  innerRadius,
  totalSegments,
  rotationOffset,
  angleOffset = 0,
  radialOffset = 0,
  avatarUrl,
}) => {
  const anglePer = 360 / totalSegments;
  const startAngle = segmentIndex * anglePer - rotationOffset;
  const endAngle = (segmentIndex + 1) * anglePer - rotationOffset;
  const midBase = startAngle + (endAngle - startAngle) / 2;
  const midAngle = midBase + angleOffset;

  const baseRadius = innerRadius + 10;
  const radius = baseRadius + radialOffset;

  const rad = (midAngle * Math.PI) / 180;
  const x = radius * Math.cos(rad);
  const y = radius * Math.sin(rad);

  const r = size / 2;

  // Ajuste aqui para borda mínima (ajuste para 0 se quiser o avatar encostando na borda preta)
  const borderGap = 1;

  return (
    <>
      {/* Círculo branco de fundo e borda preta */}
      <circle
        cx={x}
        cy={y}
        r={r}
        fill="#FFF"
        stroke="#000"
        strokeWidth={2}
      />
      {/* Avatar recortado em círculo */}
      <clipPath id={`avatar-clip-${x}-${y}`}>
        <circle cx={x} cy={y} r={r - borderGap} />
      </clipPath>
      <image
        href={avatarUrl}
        x={x - r + borderGap}
        y={y - r + borderGap}
        width={2 * (r - borderGap)}
        height={2 * (r - borderGap)}
        clipPath={`url(#avatar-clip-${x}-${y})`}
        preserveAspectRatio="xMidYMid slice"
      />
    </>
  );
};

export default Pawn;
