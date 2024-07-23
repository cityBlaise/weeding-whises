import {
  FC,
  memo,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BsEyeglasses } from "react-icons/bs";
import { useOverlay } from "../Context/Overlay/Overlay.store";
import { nanoid } from "nanoid";

type TextOverflow = PropsWithChildren;
const TextOverflow: FC<TextOverflow> = memo(({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const open = useOverlay((state) => state.open);
  const close = useOverlay((state) => state.close);
  const [textCutted, settextCutted] = useState(false);
  const observer = useRef<ResizeObserver>(new ResizeObserver(() => {}));
  const id = useMemo(() => nanoid(), []);

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
          onClick={(e) => {
            e.stopPropagation();
            open(
              <TextModal close={close} id={id}>
                {children}
              </TextModal>,
              id,
              true
            );
          }}
          className="absolute bottom-0 right-0 bg-white border p-1.5 aspect-square  shadow shadow-slate-400 m-2 rounded-lg"
        >
          <BsEyeglasses size={15} />
        </button>
      )}
      <div className="break-words whitespace-pre-line max-h-full overflow-hidden   max-w-full">
        {children}
      </div>
    </div>
  );
});

interface TextModal extends PropsWithChildren {
  close: (id: string) => void;
  id: string;
}
const TextModal: FC<TextModal> = memo(({ children, close, id }) => {
  return (
    <div
      className="overflow-hidden w-full h-full grid place-content-center  p-2 py-4"
      onClick={(e) => {
        if (e.target == e.currentTarget) {
          close(id);
        }
      }}
    >
      <div className="bg-white w-full max-w-full overflow-hidden relative rounded shadow-xl border">
        <button
          className="border shadow-sm p-1.5 bg-red-400 block ml-auto mb-0.5 rounded-full"
          onClick={() => close(id)}
        ></button>
        <div className="border-t max-w-md w-full overflow-auto max-h-[400px]">
          <div className="card break-words whitespace-pre-line max-h-full p-6 pb-10 h-full   max-w-full leading-snug">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

export default TextOverflow;
