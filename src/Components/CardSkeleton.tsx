import { FC, memo } from "react";
// import { ScreenSize } from "../Context/AppSettings/AppSettings";
// import { useAppSettings } from "../Context/AppSettings/AppSettings.store";

const CardSkeleton: FC = memo(() => {
  // const screenSize = useAppSettings((state) => state.screenSize);
  return (
    <div
      className={`flex flex-col min-w-full  bg-gray-200 border   gap-y-4  shadow h-full w-full max-w-full  animate-pulse rounded`}
    >
      <div className="w-full h-full flex-shrink">
        <div className="font-josephsophia relative grid gap-y-3 p-5 py-5 isolate">
          <div className="w-1/2 h-1.5 rounded-sm bg-gray-400" />
          <div className="w-full h-1.5 rounded-sm bg-gray-400" />
          <div className="w-full h-1.5 rounded-sm bg-gray-400" />
          <div className="w-full h-1.5 rounded-sm bg-gray-400" />  
          <div className="w-2/3 h-1.5 rounded-sm bg-gray-400" />
          <div className="w-1/4 h-1.5 rounded-sm bg-gray-400" /> 
          <div className="w-1/6 h-1.5 rounded-sm bg-gray-400" /> 
        </div>
      </div>
      <div className="text-end mt-auto gap-2 h-full flex flex-col mb-3 px-5 items-end justify-end">
        <div className="w-1/2 h-1.5 rounded-sm bg-gray-400" />
        <div className="w-1/4 h-1.5 rounded-sm bg-gray-400" />
      </div>
    </div>
  );
});

export default CardSkeleton;
