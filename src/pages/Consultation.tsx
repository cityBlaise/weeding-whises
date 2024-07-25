import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Components/Pagination";
// import { useAppSettings } from "../Context/AppSettings/AppSettings.store";
import { AnimatePresence, motion } from "framer-motion";
import { nanoid } from "nanoid";
import Card from "../Components/Card";
import SliderSkeleton from "../Components/SliderSkeleton";
import { ScreenSize } from "../Context/AppSettings/AppSettings";
import { useAppSettings } from "../Context/AppSettings/AppSettings.store";
import { useDataFetchingIndicator } from "../Context/DataFetchingIndicator/DataFetchingIndicator.store";
import { useOverlay } from "../Context/Overlay/Overlay.store";
import useFetch from "../Hooks/useFetch";
import { CONSTS } from "../utils/consts/const";
import PaginatedDataFetched from "../utils/types/PaginatedDataFetched";
import Post from "../utils/types/Post";
import loadingError from "/internet-error.svg";
// import emptyData from "/empty-data.svg";

const Consultation = () => {
  const backendUrl = CONSTS.BACKEND_URL;

  const screenSize = useAppSettings((state) => state.screenSize);
  const timer = useRef<null | ReturnType<typeof setTimeout>>(null);
  const [showLoader, setShowLoader] = useState(false);
  const setDataFetchingIndicator = useDataFetchingIndicator(
    (state) => state.setLoading
  );
  const open = useOverlay((state) => state.open);
  const close = useOverlay((state) => state.close);

  const [searchParams] = useSearchParams();
  const [data, error, loading] = useFetch<PaginatedDataFetched<Post[]>>(
    `${backendUrl}/post` +
      (searchParams.get("page") == null
        ? ""
        : `?page=${searchParams.get("page")}`)
  );
  useEffect(() => {
    if (loading) {
      setDataFetchingIndicator(true);
    } else {
      // setIndex(0);
      setTimeout(() => {
        setDataFetchingIndicator(false);
      }, 250);
    }
    // Start the timer
    timer.current = setTimeout(() => {
      setShowLoader((prev) =>
        data == null && !prev && loading ? true : false
      );
    }, 250);

    // Clear the timer on component unmount
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [loading]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [data]);

  return (
    <div className="relative  h-full  w-full max-w-full py-12">
      <div
        className={`w-full
        ${screenSize >= ScreenSize.MEDIUM && "py-3"}
        `}
      >
        <AnimatePresence mode="popLayout">
          {showLoader && (
            <motion.div
              layout
              key={";2"}
              className="w-full"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SliderSkeleton slides={7} />
            </motion.div>
          )}
          {error && (
            <motion.div
              key={";5"}
              className="max-w-sm mx-auto  object-contain"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img draggable={false} src={loadingError} />
              <div className="text-center text-2xl text-red-600 font-josephsophia whitespace-pre-line break-words">
                {`impossible de joindre le serveur \nveuillez réessayer`}
              </div>
            </motion.div>
          )}

          {!showLoader && !error && data && (
            <motion.div
              layout
              key={";"}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="grid gap-5 gap-y-9 w-full flex-1 min-w-full"
                style={{
                  gridTemplateColumns: "repeat( auto-fill, minmax(180px,1fr))",
                  gridAutoRows: "260px",
                }}
              >
                {data.data.map((x, i) => {
                  return (
                    <motion.div
                      key={x.postId}
                      layout
                      initial={{
                        opacity: 0,
                        y: 25,
                        rotate: i % 2 == 0 ? 1.5 : -1.5,
                      }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 25 }}
                      transition={{
                        duration: 0.15,
                        delay: i == 0 ? 0.2 : i * 0.3,
                      }}
                      className={`cursor-pointer shadow shadow-black/20 hover:shadow-xl hover:transition-all p-2 bg-white border rounded`}
                      onClick={() => {
                        open(
                          <div
                            className="h-full w-full items-center justify-center flex  p-4"
                            onClick={(e) => {
                              if (e.currentTarget == e.target) close(x.postId);
                            }}
                          >
                            <div className="card relative isolate h-full max-h-[400px] w-full max-w-2xl  bg-slate-50">
                              <Card {...x} />
                              <div
                              style={{
                                width: `calc(100% + 1px)`,
                                height: `calc(100% + 1px)`, 
                              }}
                              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-1 bg-white"/>
                              <div
                              style={{
                                width: `calc(100% + 1px)`,
                                height: `calc(100% + 1px)`, 
                              }}
                              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-1 bg-white"/>
                            </div>
                          </div>,
                          x.postId,
                          true
                        );
                      }}
                    >
                      <Card {...x} />
                    </motion.div>
                  );
                })}
              </div>
              {data.pages > 1 && (
                <div className="mt-10">
                  <Pagination pages={data.pages} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Consultation;
