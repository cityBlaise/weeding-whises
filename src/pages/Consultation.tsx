import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Dots from "../Components/Dots";
import Pagination from "../Components/Pagination";
import Slider from "../Components/Slider";
// import { useAppSettings } from "../Context/AppSettings/AppSettings.store";
import useFetch from "../Hooks/useFetch";
import PaginatedDataFetched from "../utils/types/PaginatedDataFetched";
import Post from "../utils/types/Post";

const Consultation = () => {
  // const screenSize = useAppSettings((state) => state.screenSize);
  const [searchParams, ] = useSearchParams();
  const [index, setIndex] = useState(0);
  const _setIndex = useCallback(setIndex, [setIndex]);
  const [data, error, loading] = useFetch<PaginatedDataFetched<Post[]>>(
    "http://localhost:3000/post" +
      (searchParams.get("page") == null
        ? ""
        : `?page=${searchParams.get("page")}`)
  );
  useEffect(() => {
    setIndex(0);
  }, [data]);

  return (
    <div className="relative py-6 w-full max-w-full grid place-items-center">
      <div className="max-w-3xl">
        {loading && <div>loading</div>}
        {error && (
          <div className="break-words whitespace-pre-line">
            {JSON.stringify(error, null, 3)}
          </div>
        )}
        {data && (
          <>
            <Slider
              data={data.data}
              slides={data.data.length}
              activeIndex={index}
              setActiveIndex={_setIndex}
            />
            <div>
              <Dots
                dotsLenght={data.data.length}
                activeIndex={index}
                setActiveIndex={_setIndex}
              />
            </div>
            {data.pages > 1 && (
              <div className="mt-10">
                <Pagination pages={data.pages} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Consultation;
