import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import img1 from "/img1.png";
import img3 from "/img3.jpg";
import { useAppSettings } from "../Context/AppSettings/AppSettings.store";
import { ScreenSize } from "../Context/AppSettings/AppSettings";
const XLargeScreen = () => {
  const { pathname } = useLocation();
  const screenSize = useAppSettings((state) => state.screenSize);
  return (
    <div className="flex-1 xlarge-screen h-full flex flex-col">
      <Header />
      <main className="max-w-[1500px] mx-auto gap-10  h-full flex-1 flex relative mt-3 px-4   w-full">
        {pathname !== "/auth" && (
          <div className="sticky top-14 translate-y-1/2 h-fit w-[15%] px-2 grid place-items-center">
            <img
              src={img3}
              alt=""
              className="max-w-full blur-[3px] object-contain  mask-img2"
            />
          </div>
        )}
        <div className=" flex-1 w-full flex flex-col  px-8">
          <div
            className={`w-full flex justify-center h-full ${
              pathname == "/auth" && screenSize >= ScreenSize.SMALL
                ? "max-w-md mx-auto"
                : ""
            }`}
          >
            <Outlet />
          </div>
        </div>

        {pathname == "/" && (
          <div className="sticky top-14 mt-14 py-3 shadow-xl h-fit w-[15%] px-2 grid place-items-center rounded bg-white border">
            <div
              contentEditable={false}
              className="font-bold heading leading-none w-full font-lovely text-center capitalize"
            >
              exprimez vos voeux
              <br />
              Aux époux
            </div>
            <img
              src={img1}
              alt=""
              className="w-full object-contain mask-img2 order-first"
            />
          </div>
        )}
        {/* <div className="sticky top-14 mt-14 py-3 shadow-xl h-fit w-[15%] px-2 grid place-items-center rounded bg-white border">
          <div
            contentEditable={false}
            className="font-bold heading leading-none w-full font-lovely text-center capitalize"
          >
            exprimez vos voeux
            <br />
            Aux époux
          </div>
          <img
            src={img1}
            alt=""
            className="w-full object-contain mask-img2 order-first"
          />
        </div> */}
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default XLargeScreen;
