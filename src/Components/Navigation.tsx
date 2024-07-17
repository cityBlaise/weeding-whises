import { LiaSignInAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useAppSettings } from "../Context/AppSettings/AppSettings.store";
import { TfiGift } from "react-icons/tfi";
import { ScreenSize } from "../Context/AppSettings/AppSettings";
const Navigation = () => {
  const screenSize = useAppSettings((state) => state.screenSize);

  return (
    <div>
      {screenSize >= ScreenSize.LARGE ? (
        <ul className="text-base flex gap-x-3 items-center">
          <li>
            <Link to="whises">
              <div className="border text-gray-700   flex items-center gap-1 border-gray-300 bg-slate-50 p-1 font-lovely text-xl font-bold px-4 rounded-xl">
                <TfiGift className="" size={15} />
                <span>whises</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="auth">
              <div className="border text-gray-700   flex items-center gap-1 border-gray-300 bg-slate-50 p-1 font-lovely text-xl font-bold px-4 rounded-xl">
                <LiaSignInAltSolid size={15} />
                <span>sign in</span>
              </div>
            </Link>
          </li>
        </ul>
      ) : (
        <div>
          <ul className="flex gap-x-4">
            <li className="border border-gray-300 p-1 rounded-xl">
              <Link to="whises">
                <TfiGift className="text-slate-500" size={20} />
              </Link>
            </li>
            <li className="border border-gray-300 p-1 rounded-xl">
              <Link to="auth">
                <LiaSignInAltSolid className="text-slate-500" size={20} />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navigation;
