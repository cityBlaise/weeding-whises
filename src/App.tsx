// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { Outlet } from "react-router-dom";
import "./App.css";
import { ScreenSize } from "./Context/AppSettings/AppSettings";
import { useAppSettings } from "./Context/AppSettings/AppSettings.store";
import Overlay from "./Context/Overlay/Overlay";
import Toasts from "./Context/Toast/Toasts";
import LargeScreen from "./Layout/Large.screen";
import SmallScreen from "./Layout/Small.screen";
import XLargeScreen from "./Layout/XLarge.screen";

function App() {
  const screenSize = useAppSettings((state) => state.screenSize);
  const getLayout = () => {
    if (screenSize <= ScreenSize.MEDIUM) return <SmallScreen />;
    if (ScreenSize.LARGE === screenSize) return <LargeScreen />;
    if (ScreenSize.XLARGE <= screenSize) return <XLargeScreen />;
  };
  return (
    <>
      <Overlay />
      <Toasts />
      {getLayout()}
    </>
  );
}

export default App;
