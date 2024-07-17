import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, FC, memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import { GoAlertFill, GoCheckCircleFill } from "react-icons/go";
import { IoAlertCircleSharp } from "react-icons/io5";
import { Toast, useToast } from "./Toast.store";
import styles from "./style.module.css";

const ToastComponent: FC<Toast> = memo(
  ({ text, type = "normal", duration = 5, id }: Toast) => {
    const style: CSSProperties = {
      animationDuration: `${duration * 1000}ms`,
      animationFillMode: "forwards",
      animationTimingFunction: "ease-out",
    };
    const variants = {
      error: {
        icon: <IoAlertCircleSharp size={30} />,
        text: "text-red-500",
        bgPrimary: "bg-red-400",
        bgSecondary: "bg-red-100",
        border: "border-red-100",
      },
      warning: {
        icon: <GoAlertFill size={25} />,
        text: "text-orange-500",
        bgPrimary: "bg-orange-400",
        bgSecondary: "bg-orange-100",
        border: "border-orange-100",
      },
      normal: {
        icon: <BsInfoCircleFill size={25} />,
        text: "text-blue-500",
        bgPrimary: "bg-blue-400",
        bgSecondary: "bg-blue-100",
        border: "border-blue-100",
      },
      success: {
        icon: <GoCheckCircleFill size={30} />,
        text: "text-green-500",
        bgPrimary: "bg-green-400",
        bgSecondary: "bg-green-100",
        border: "border-green-100",
      },
    };
    const [hover, setHover] = useState(false);
    const close = useToast((store) => store.removeToast);
    const timer = useRef<null | ReturnType<typeof setTimeout>>(null);
    useEffect(() => {
      // Start the timer
      timer.current = setTimeout(() => {
        close(id);
      }, duration * 1000);

      // Clear the timer on component unmount
      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }, [close, duration, id]);

    const handleMouseEnter = () => {
      // Pause the timer when hovering
      if (timer.current) {
        clearTimeout(timer.current);
      }
      setHover(true);
    };

    const handleMouseLeave = () => {
      // Resume the timer when leaving
      timer.current = setTimeout(() => {
        close(id);
      }, duration * 1000);
      setHover(false);
    };

    return (
      <div
        onClick={() => close(id)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full cursor-pointer relative text-lg font-bold   bg-white shadow-lg rounded-t-lg"
      >
        <div className="h-full items-center p-4 py-2 flex gap-3">
          <div
            className={`p-3 rounded-full ${variants[type].text} ${variants[type].bgSecondary}`}
          >
            {variants[type].icon}
          </div>
          <div className="flex flex-col gap-2">
            <span
              className={`font-lovely font-bold p-0 leading-none text-4xl ${variants[type].text} first-letter:uppercase lowercase`}
            >
              {type}
            </span>
            <span
              className={`leading-none font-lovely text-2xl   text-gray-600 first-letter:capitalize ${
                type === "error" ? "text-red-500" : ""
              }`}
            >
              {text}
            </span>
          </div>
        </div>
        <div
          className={`absolute rounded-b-3xl w-full bg-inherit flex overflow-hidden top-full h-1.5 ${variants[type].bgSecondary} border-t ${variants[type].border}`}
        >
          <span
            style={style}
            onAnimationEnd={() => close(id)}
            className={`${styles.animateWidth} ${hover ? styles.pause : ""} ${
              variants[type].bgPrimary
            } w-full h-full rounded-tr-3xl`}
          ></span>
        </div>
      </div>
    );
  }
);

const ToastsWrapper = () => {
  const toasts = useToast((store) => store.toasts);
  return (
    <AnimatePresence mode="popLayout">
      {toasts.length > 0 && (
        <div className="fixed z-50  grid gap-5 overflow-hidden max-w-full w-[340px] px-2 py-4 right-0 top-16">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              // transition={{  duration: .5 }}
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 2, opacity: 1 }}
              exit={{ x: 400, opacity: 0, transition: { duration: .5 } }}
              layout
            >
              <ToastComponent {...t} />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export const Toasts = () => {
  return createPortal(<ToastsWrapper />, document.getElementById("overlay")!);
};
export default Toasts;
