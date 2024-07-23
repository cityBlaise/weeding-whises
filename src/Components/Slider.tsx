import { motion, useMotionValue } from "framer-motion";
import { FC } from "react";
import Card from "./Card";
import Post from "../utils/types/Post";
import { useAppSettings } from "../Context/AppSettings/AppSettings.store";
import { ScreenSize } from "../Context/AppSettings/AppSettings";

interface Slider {
  data: Post[];
  slides: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}
const Slider: FC<Slider> = ({ activeIndex, setActiveIndex, slides, data }) => {
  const screenSize = useAppSettings((state) => state.screenSize);

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
    <div className={`w-full max-w-full overflow-hidden h-fit py-6 mask4`}>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        transition={SPRING_OPTIONS}
        style={{
          x: dragX,
          gridTemplateColumns: `repeat(${slides},96%)`,
        }}
        onDragEnd={onDragEnd}
        initial={false}
        animate={{
          translateX: `-${
            activeIndex * 96 +
            (activeIndex == 0
              ? 0
              : activeIndex % 2 != 0
              ? -3 * activeIndex
              : -2 * activeIndex)
            // index * 100 + (index == 0 ? 0 : index == 3 ? 4 : 2)
          }%`,
        }}
        className={`h-full max-h-full cursor-grab grid grid-flow-col w-full pr-1 active:cursor-grabbing
          ${screenSize == ScreenSize.XLARGE && "max-w-3xl"}
          ${screenSize == ScreenSize.MEDIUM && "max-w-2xl"}
          ${screenSize <= ScreenSize.SMALL && "max-w-[90%]"} 
          `}
      >
        {Array(slides)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`${i % 2 == 0 ? "rotate-3" : "-rotate-3"} ${
                i == activeIndex
                  ? "z-[1] shadow"
                  : "z-0 opacity-80 translate-y-10"
              }
                w-full ${
                  screenSize < ScreenSize.MEDIUM && "max-h-[550px] h-[75vh]"
                }
                ${screenSize == ScreenSize.SMALL && "max-h-[450px] h-[80vh]"}
                ${
                  screenSize >= ScreenSize.MEDIUM &&
                  "h-[340px]"
                } 
                ${
                  screenSize >= ScreenSize.LARGE &&
                  "h-[400px]"
                } 
               max-w-full w-fit overflow-hidden
              transition-all duration-500`}
            >
              <Card {...data[i]} />
            </div>
          ))}
      </motion.div>
    </div>
  );
};

export default Slider;
