import { TfiGift } from "react-icons/tfi";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDataFetchingIndicator } from "../Context/DataFetchingIndicator/DataFetchingIndicator.store";

const Header = () => {
  const loadingData = useDataFetchingIndicator((state) => state.loading);
  return (
    <div className="bg-white p-2 py-1.5 items-center justify-between flex border-b border-b-slate-300 sticky top-0 z-10">
      <div className="absolute top-0 left-0 w-full h-1">
        {loadingData && (
          <motion.div
            layout
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 10, // Duration of each animation cycle
              repeat: Infinity, // Repeat indefinitely
              repeatType: "reverse", // Reverses the animation back and forth
            }}
            className="h-full bg-emerald-400 w-1/2"
          />
        )}
      </div>
      <Link
        to={"/"}
        className="font-josephsophia text-green-hermine logo capitalize px-2 relative isolate"
      >
        <span>whises</span>
        <TfiGift className="absolute z-0 icon" />
      </Link>
      <Navigation />
    </div>
  );
};

export default Header;
