import { motion, useMotionValue } from "framer-motion";
import { FC } from "react";
import Card from "./Card";
import Post from "../utils/types/Post";

interface Slider {
  data: Post[];
  slides: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}
const Slider: FC<Slider> = ({ activeIndex, setActiveIndex, slides, data }) => {
  const dragX = useMotionValue(0);
  const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
  };
  const onDragEnd = () => {
    let next = activeIndex;
    if (dragX.get() >= 50 && dragX.get() > 0) {
      next = activeIndex - 1 < 0 ? activeIndex : activeIndex - 1;
    } else if (dragX.get() <= -50 && dragX.get() < 0) {
      next = activeIndex + 1 == slides ? activeIndex : activeIndex + 1;
    }
    setActiveIndex(next!);
  };
  return (
    <div className="w-full overflow-x-hidden h-fit mask4">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        transition={SPRING_OPTIONS}
        style={{
          x: dragX,
          gridTemplateColumns: `repeat(${slides},100%)`,
        }}
        onDragEnd={onDragEnd}
        initial={false}
        animate={{
          translateX: `-${
            activeIndex * 100 +
            ( activeIndex == slides - 1 ? .5 : 0)
            // index * 100 + (index == 0 ? 0 : index == 3 ? 4 : 2)
          }%`,
        }}
        className="h-fit cursor-grab grid grid-flow-col w-full gap-x-2 pr-1 active:cursor-grabbing "
      >
        {Array(slides)
          .fill(0)
          .map((_, i) => (
            <Card key={i} {...data[i]} />
          ))}
      </motion.div>
    </div>
  );
};

export default Slider;
