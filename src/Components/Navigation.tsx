// import { LiaSignInAltSolid } from "react-icons/lia";
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
              <div className="border text-green-hermine   flex items-center gap-1 border-gray-300 bg-slate-50 p-0.5 font-lovely text-2xl font-bold px-4 rounded">
                <span>consulter</span>
                <TfiGift className="" size={15} />
              </div>
            </Link>
          </li>
          {/* <li>
            <Link to="auth">
              <div className="border text-gray-700   flex items-center gap-1 border-gray-300 bg-slate-50 p-0.5 font-lovely text-2xl font-bold px-4 rounded">
                <span>sign in</span>
                <LiaSignInAltSolid size={15} />
              </div>
            </Link>
          </li> */}
        </ul>
      ) : (
        <div>
          <ul className="flex gap-x-4">
            <li className="border border-gray-300 p-2 rounded">
              <Link to="whises">
                <TfiGift className="text-slate-500" size={20} />
              </Link>
            </li>
            {/* <li className="border border-gray-300 p-2 rounded">
              <Link to="auth">
                <LiaSignInAltSolid className="text-slate-500" size={20} />
              </Link>
            </li> */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navigation;
