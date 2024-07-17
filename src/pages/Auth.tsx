import { ScreenSize } from "../Context/AppSettings/AppSettings";
import { useAppSettings } from "../Context/AppSettings/AppSettings.store";
import img6 from "/img6.png";
import { TfiGift } from "react-icons/tfi";
const Auth = () => {
  const screenSize = useAppSettings((state) => state.screenSize);
  return (
    <div className="p-8 text-lg w-full isolate grid gap-2 max-w-full relative mx-auto shadow-lg my-auto">
      <div className="absolute left-0 top-0  s2 -z-10 w-full h-full border " />
      <div className="absolute left-0 top-0 -rotate-2  s2 -z-10 w-full h-full border " />
      <div className="absolute left-0 top-0 rotate-2  s2 -z-10 w-full h-full border " />
      <div className="relative isolate w-fit max-w-full mx-auto border border-dashed border-black px-2 rotate-6">
        <span className="font-josephsophia text-7xl leading-none p-0">whises</span>
        <TfiGift className="absolute z-0 top-0 -translate-x-1/2 right-0" />
      </div>
      <div className="font-lovely text-3xl font-bold capitalize grid gap-1 max-w-full">
        <span>login</span>
        <input type="text" placeholder="your username"  className=""/>
      </div>
      <div className="font-lovely text-3xl font-bold capitalize grid gap-1">
        <span>password</span>
        <input type="password" placeholder="*********" />
      </div>
      <div className={`${screenSize<ScreenSize.MEDIUM?'grid':'flex justify-end items-start'} gap-3 font-lovely text-2xl mt-2 font-bold`}>
        <button
          type="reset"
          className="s2 relative bg-slate-400 border p-0.5 shadow px-10 capitalize"
        >
          <span>reset</span>
          <img src={img6} className="absolute top-0 left-0 h-6 aspect-square" />
          <img
            src={img6}
            className="absolute top-0 right-0 h-10 aspect-square "
          />
          {/* <img src={img6}/> */}
        </button>
        <button className="s2 bg-slate-400 relative isolate border p-0.5 shadow px-10 capitalize">
          <span>connexion</span>{" "}
          <img
            src={img6}
            className="absolute top-0 left-1/2 h-6 aspect-square"
          />
          <img
            src={img6}
            className="absolute top-0 right-0 h-10 aspect-square "
          />
        </button>
      </div>
    </div>
  );
};

export default Auth;
