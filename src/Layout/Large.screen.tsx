import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import img3 from "/img3.jpg";
import { useAppSettings } from "../Context/AppSettings/AppSettings.store";
import { ScreenSize } from "../Context/AppSettings/AppSettings";
const LargeScreen = () => {
  const { pathname } = useLocation();
  const screenSize = useAppSettings((state) => state.screenSize);
  return (
    <div className="flex-1 large-screen flex flex-col">
      <Header />
      <main className="max-w-full flex relative flex-1">
        <div className="sticky top-14 mt-14   w-[200px] h-fit px-2 grid place-items-center bg-white border shadow-xl rounded translate-y-1/2 ml-8">
          <img
            src={img3}
            alt=""
            className="max-w-full max-h-full"
          />
        </div>
        <div className="grid place-items-center flex-1 w-full">
          <div
            className={`w-5/6 ${
              pathname == "/auth"&& screenSize >= ScreenSize.SMALL ? "max-w-md" : ""
            }`}
          >
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LargeScreen;
