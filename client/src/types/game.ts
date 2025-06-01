export type Category = "M" | "V" | "S" | "EL" | "AE" | "CT";

export interface Player {
   id: string;
  name: string;
  avatarUrl: string;
  score: number;
  currentSegment: number;
  tokenColor: string;
  
}

export interface PawnProps {
  segmentIndex: number;
  color: string;
  size: number;
}

export interface BoardProps {
  categories: Category[];
  segmentColors: Record<Category, string>;
  selectedSegment?: number;
  onSegmentClick?: (idx: number) => void;
  pawns?: PawnProps[];
  isSpinning?: boolean;
}

export interface BoardSegmentProps {
  index: number;
  category: Category;
  totalSegments: number;
  outerRadius: number;
  innerRadius: number;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}
