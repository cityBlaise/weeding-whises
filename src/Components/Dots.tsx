import { motion } from "framer-motion";
import { FC, memo } from "react";

interface Dots {
  activeIndex: number;
  setActiveIndex:(index:number)=>void;
  dotsLenght: number;
}
const Dots: FC<Dots> = memo(({activeIndex,dotsLenght,setActiveIndex} )=> {
  return (
    <div className="flex mt-3 justify-center w-full gap-4">
      {Array(dotsLenght)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className="w-3 aspect-square bg-gray-500 border-gray-300 cursor-pointer rounded-full border relative isolate"
          >
            {activeIndex == i && (
              <motion.div
                layoutId="underline"
                className="top-full left-0 w-full h-[1px] mt-1 rounded-xl absolute z-0 border bg-white"
              />
            )}
          </div>
        ))}
    </div>
  );
});

export default Dots;
