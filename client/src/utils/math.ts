// Converte graus em radianos
export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function describeDonutSegment(
  cx: number,
  cy: number,
  R: number,
  r: number,
  startAngleDeg: number,
  endAngleDeg: number
): string {
  const startAngle = degToRad(startAngleDeg);
  const endAngle = degToRad(endAngleDeg);

  const x1 = cx + R * Math.cos(startAngle);
  const y1 = cy + R * Math.sin(startAngle);

  const x2 = cx + R * Math.cos(endAngle);
  const y2 = cy + R * Math.sin(endAngle);

  const x3 = cx + r * Math.cos(endAngle);
  const y3 = cy + r * Math.sin(endAngle);

  const x4 = cx + r * Math.cos(startAngle);
  const y4 = cy + r * Math.sin(startAngle);

  // Arc large-flag = 0 (já que 12° < 180°)
  return `
    M ${x1} ${y1}
    A ${R} ${R} 0 0 1 ${x2} ${y2}
    L ${x3} ${y3}
    A ${r} ${r} 0 0 0 ${x4} ${y4}
    Z
  `;
}