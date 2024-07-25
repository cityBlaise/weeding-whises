import { ReactNode, Suspense, lazy, useEffect, useRef, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Test } from "../pages/Test.tsx";
const Post = lazy(() => import("../pages/Post.tsx"));
const Consultation = lazy(() => import("../pages/Consultation.tsx"));
const Auth = lazy(() => import("../pages/Auth.tsx"));

export const Loader = () => {
  const timer = useRef<null | ReturnType<typeof setTimeout>>(null);
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    // Start the timer
    timer.current = setTimeout(() => {
      setShowLoader(true);
    }, 2000);

    // Clear the timer on component unmount
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);
  if (showLoader)
    return (
      <div className="grid place-items-center w-full h-full fixed top-0 left-0 bg-white/80">
        <div className="w-fit p-3 min-w-[300px] border text-center shadow-sm  text-xl font-josephsophia font-bold capitalize grid place-items-center rounded-xl">
         veuillez patienter svp ..
        </div>
      </div>
    );
  return "";
};

const wrappWithSuspense = (component: ReactNode) => {
  return <Suspense fallback={<Loader />}>{component}</Suspense>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: wrappWithSuspense(<Post />) },
      {
        path: "whises",
        element: wrappWithSuspense(<Consultation />),
      },
      {
        path: "auth",
        element: wrappWithSuspense(<Auth />),
      },
      {
        path: "test",
        element: wrappWithSuspense(<Test />),
      },
    ],
  },
]);

export default router;
