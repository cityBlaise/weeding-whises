import { FormEvent } from "react";
import { TfiGift } from "react-icons/tfi";
import { ScreenSize } from "../Context/AppSettings/AppSettings";
import { useAppSettings } from "../Context/AppSettings/AppSettings.store";
import { useToast } from "../Context/Toast/Toast.store";
import img6 from "/img6.png";
import { CONSTS } from "../utils/consts/const";
const Auth = () => {
  const backendUrl = CONSTS.BACKEND_URL;
  const addToast = useToast((state) => state.addToast);

  const screenSize = useAppSettings((state) => state.screenSize);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const formData = new FormData(e.currentTarget);
    const login = formData.get("login")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    if (!login.trim()) {
      addToast({ text: "Please enter your login", type: "error" });
      return
    }
    try {
      const response = await fetch(`${backendUrl}/auth/sign-in`, {
        method: "POST",
        body: JSON.stringify({
          userName: login,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 401)
        throw new Error("Login ou Mot de Passe invalid");
      if (response.status == 200)
        addToast({ text: "", type: "success" });
    } catch (error) {
      addToast({ text: (error as Error).message, type: "error" });
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="p-8 text-lg w-full isolate grid gap-2 max-w-full relative mx-auto shadow-lg my-auto"
    >
      <div className="absolute left-0 top-0  s2 -z-10 w-full h-full border " />
      <div className="absolute left-0 top-0 -rotate-2  s2 -z-10 w-full h-full border " />
      <div className="absolute left-0 top-0 rotate-2  s2 -z-10 w-full h-full border " />
      <div className="relative isolate w-fit max-w-full mx-auto border border-dashed border-black px-2 rotate-6">
        <span className="font-josephsophia text-7xl leading-none p-0">
          whises
        </span>
        <TfiGift className="absolute z-0 top-0 -translate-x-1/2 right-0" />
      </div>
      <div className="font-lovely text-3xl font-bold capitalize grid gap-1 max-w-full">
        <span>login</span>
        <input
          type="text"
          placeholder="your username"
          className=""
          name="login"
        />
      </div>
      <div className="font-lovely text-3xl font-bold capitalize grid gap-1">
        <span>password</span>
        <input type="password" placeholder="*********" name="password" />
      </div>
      <div
        className={`${
          screenSize < ScreenSize.MEDIUM
            ? "grid"
            : "flex justify-end items-start"
        } gap-3 font-lovely text-2xl mt-2 font-bold`}
      >
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
    </form>
  );
};

export default Auth;
