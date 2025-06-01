import React from "react";
import { Category } from "../../types/game";

interface CategoryLegendProps {
  categoryNames: Record<Category, string>;
  categoryColors: Record<Category, string>;
}

const CategoryLegend: React.FC<CategoryLegendProps> = ({
  categoryNames,
  categoryColors,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Object.entries(categoryNames).map(([key, label]) => {
        const cat = key as Category;
        return (
          <div
            key={cat}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                backgroundColor: categoryColors[cat],
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#FFF",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {cat}
            </div>
            <span
              style={{
                marginLeft: "8px",
                color: "#FFF",
                fontSize: "16px",
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryLegend;
