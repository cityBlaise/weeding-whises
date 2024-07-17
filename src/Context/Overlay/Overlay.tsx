import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import style from "./Overlay.module.css";
import { useOverlay } from "./Overlay.store";

const Overlay = () => {
  const { close, isOpen, child, closeOnClickOutside } = useOverlay();

  const { pathname } = useLocation();
  const [bounce, setBounce] = useState(false);
  const [, startTransition] = useTransition();

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.setProperty(
        "padding-right",
        window.innerWidth - document.documentElement.clientWidth + "px"
      );
      document.body.classList.add("overlayIsOpen");
      if (overlayRef.current) overlayRef.current.focus();
    } else {
      document.body.style.setProperty("padding-right", "0px");
      document.body.classList.remove("overlayIsOpen");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (closeOnClickOutside) {
        close();
        return;
      } else {
        setBounce(true);
        startTransition(() => {
          setTimeout(() => {
            setBounce(false);
          }, 1000);
        });
      }
    }
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate="open"
          exit="closed"
          variants={{
            open: { opacity: 1, transition: { duration: 0.2 } },
            closed: { opacity: 0, transition: { duration: 0.2 } },
          }}
          ref={overlayRef}
          tabIndex={1} //make any element to be focusable
          className={`fixed grid w-full max-w-[100dvw] inset-0 focus:outline-none  z-50 bg-black/20  backdrop-blur-sm`}
        >
          <div
            onClick={handleClick}
            className={`${
              bounce ? style.bounce : ""
            } w-full h-full overflow-auto flex flex-col`}
          >
            {child && child}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("overlay")!
  );
};

export default Overlay;
