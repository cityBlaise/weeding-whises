import { FC } from "react";
import { ScreenSize } from "../Context/AppSettings/AppSettings";
import { useAppSettings } from "../Context/AppSettings/AppSettings.store";
import Post from "../utils/types/Post";
import img5 from "/img5.png";
import img6 from "/img6.png";
import img7 from "/img7.png";
import screen from "/screen.webp";
import TextOverflow from "./TextOverflow";

const Card: FC<Post> = ({ message, author }) => {
  const screenSize = useAppSettings((state) => state.screenSize);

  return (
    <div
      className={`flex flex-col  border relative isolate gap-y-4 leading-tight  s3 h-full w-full ${
        screenSize < ScreenSize.MEDIUM ? " " : " "
      } overflow-hidden p-4 font-josephsophia`}
    >
      <div className="w-full h-full overflow-auto flex-shrink">
        <TextOverflow>
          <div className="font-josephsophia">{message}</div>
        </TextOverflow>
        
      </div>
      <div className="text-end mt-auto leading-none">{author}</div>
      <img
        draggable={false}
        className="absolute max-w-[60px] -z-10 opacity-40 -top-5 right-0 -rotate-[35deg] translate-x-3 origin-center object-contain"
        src={screen}
        alt=""
      />
      <img
        draggable={false}
        className="absolute max-w-[60px] -z-10 opacity-40 -bottom-5 left-0 rotate-[35deg] translate-x-3 origin-center object-contain"
        src={screen}
        alt=""
      />
      <img
        draggable={false}
        className="absolute max-w-[40px] -z-10 opacity-40 -bottom-5 right-0 rotate-[35deg] translate-x-3 origin-center object-contain"
        src={img5}
        alt=""
      />
      <img
        draggable={false}
        className="absolute max-w-[40px] -z-10 opacity-40 -top-0 left-0 rotate-[35deg] translate-x-3 origin-center object-contain"
        src={img7}
        alt=""
      />
      <img
        draggable={false}
        className="absolute max-w-[100px] -z-10 opacity-40 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rotate-[35deg] origin-center object-contain"
        src={img6}
        alt=""
      />
    </div>
  );
};

export default Card;
