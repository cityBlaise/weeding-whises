import {
  FC,
  memo,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { RiMoreFill } from "react-icons/ri";
import { useOverlay } from "../Context/Overlay/Overlay.store";

type TextOverflow = PropsWithChildren;
const TextOverflow: FC<TextOverflow> = memo(({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const open = useOverlay((state) => state.open);
  const close = useOverlay((state) => state.close);
  const [textCutted, settextCutted] = useState(false);
  const observer = useRef<ResizeObserver>(new ResizeObserver(() => {}));

  useEffect(() => {
    observer.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          settextCutted(
            entry.target.scrollHeight - entry.target.clientHeight > 0
          );
        }
      }
    });
    containerRef.current && observer.current.observe(containerRef.current);

    return () => observer.current.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative max-w-full max-h-full overflow-hidden"
    >
      {textCutted && (
        <button
          onClick={() =>
            open(<TextModal close={close}>{children}</TextModal>, true)
          }
          className="absolute bottom-0 right-0 bg-white border  p-0.5 aspect-square  shadow-sm rounded-full"
        >
          <RiMoreFill size={12} />
        </button>
      )}
      <div className="break-words whitespace-pre-line max-h-full overflow-hidden   max-w-full">
        {children}
      </div>
    </div>
  );
});

interface TextModal extends PropsWithChildren {
  close: () => void;
}
const TextModal: FC<TextModal> = memo(({ children, close }) => {
  return (
    <div className="max-w-xl my-auto mb-3 w-fit overflow-hidden mx-auto max-h-full h-fit  p-2 py-4">
      <button
        className="border shadow-sm p-1.5 bg-red-400 block ml-auto mb-0.5 rounded-full"
        onClick={close}
      ></button>
      <div className="bg-white w-fit mx-auto max-h-full relative overflow-auto rounded shadow-xl border">
        <div className="break-words whitespace-pre-line max-h-full  p-4 pb-10   max-w-full leading-snug">
          {children}
        </div>
      </div>
    </div>
  );
});

export default TextOverflow;
