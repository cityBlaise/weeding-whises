import { TfiGift } from "react-icons/tfi";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-white p-2 py-1.5 items-center justify-between flex border-b border-b-slate-300 sticky top-0 z-10">
      <Link to={"/"} className="font-josephsophia logo capitalize px-2 relative isolate">
        <span>whises</span>
        <TfiGift
          className="absolute z-0 icon" 
        />
      </Link>
      <Navigation />
    </div>
  );
};

export default Header;
