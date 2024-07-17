import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useAppSettings } from "../Context/AppSettings/AppSettings.store";
import { ScreenSize } from "../Context/AppSettings/AppSettings";

const SmallScreen = () => {
  const { pathname } = useLocation();

  const screenSize = useAppSettings((state) => state.screenSize);
  return (
    <div className="flex-1 small-screen h-full flex flex-col">
      <Header />
      <main
        className={`mt-3 h-full flex-1 grid place-items-center w-full my-auto ${
          pathname == "/auth" && screenSize >= ScreenSize.SMALL
            ? "max-w-lg mx-auto  p-10"
            : " p-3"
        }`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SmallScreen;
