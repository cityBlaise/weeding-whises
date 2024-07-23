import { FC } from "react";
import CardSkeleton from "./CardSkeleton";

interface SliderSkeleton {
  slides: number; 
}
const SliderSkeleton: FC<SliderSkeleton> = ({ slides }) => {
  return (
    <div
      style={{
        gridTemplateColumns: "repeat( auto-fill, minmax(180px,1fr))",
        gridAutoRows: "260px",
      }}
      className={`gap-5 gap-y-9 w-full flex-1 min-w-full grid
    `}
    >
      {Array(slides)
        .fill(0)
        .map((_, i) => (
          <CardSkeleton key={i} />
        ))}
    </div>
  );
};

export default SliderSkeleton;
