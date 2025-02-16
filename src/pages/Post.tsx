import { IoIosSend } from "react-icons/io";
import { useAppSettings } from "../Context/AppSettings/AppSettings.store";
import img4 from "/12.png";
import rings from "/img7.png";
import rings2 from "/img5.png";
import floral from "/floral=pp.webp";
import buttefly from "/buttefly.png";
import { ScreenSize } from "../Context/AppSettings/AppSettings";
import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { useToast } from "../Context/Toast/Toast.store";
import { usePostMessage } from "./Post.store";
import { CONSTS } from "../utils/consts/const";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Post = () => {
  const apiUrl = CONSTS.BACKEND_URL;

  const screenSize = useAppSettings((state) => state.screenSize);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const message = usePostMessage((state) => state.message);
  const author = usePostMessage((state) => state.author);
  const setMessage = usePostMessage((state) => state.setMessage);
  const setAuthor = usePostMessage((state) => state.setAuthor);
  const addToast = useToast((state) => state.addToast);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const authorInputRef = useRef<HTMLInputElement>(null);
  const [, startTransition] = useTransition();
  const handleChangeMessage = (e: FormEvent<HTMLTextAreaElement>) => {
    startTransition(() => {
      setMessage(e.currentTarget.value);
    });
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };
  const handleChangeAuthor = (e: FormEvent<HTMLInputElement>) => {
    startTransition(() => {
      setAuthor(e.currentTarget.value);
    });
  };
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          if (messageInputRef.current) {
            if (
              messageInputRef.current?.scrollHeight >
              messageInputRef.current?.clientHeight
            ) {
              messageInputRef.current.style.height = "auto";
              messageInputRef.current.style.height =
                messageInputRef.current.scrollHeight + "px";
            }
          }
        }
      }
    });
    messageInputRef.current && observer.observe(messageInputRef.current);
    return () => observer.disconnect();
  }, []);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!message.trim()) {
      addToast({ text: `svp veuillez saisir votre méssage`, type: "error" });
      // messageInputRef.current!.focus();
      return;
    }
    if (!author.trim()) {
      addToast({ text: `svp renseignez  votre nom`, type: "error" });
      // authorInputRef.current!.focus();
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/post`, {
        method: "POST",
        body: JSON.stringify({
          message,
          author,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status < 300 && response.status >= 200) {
        setAuthor("");
        authorInputRef.current!.style.height = "auto";
        setMessage("");
        messageInputRef.current!.style.height = "auto";
        addToast({ text: "Message envoyé", type: "success" });
      } else {
        console.log(response.statusText);
        throw Error(response.statusText);
      }
    } catch (error) {
      addToast({
        text: `impossible de joindre le serveur \nveuillez réessayer`,
        type: "error",
      });
    }
    setIsSubmitting(false);
  };
  return (
    <form
      className={`grid gap-y-3 h-fit p-4 mt-5 rounded  w-full 
        ${screenSize <= ScreenSize.MEDIUM ? "max-w-xl" : "max-w-3xl"}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="grid gap-y-2 shadow-md shadow-gray-500/20 font-josephsophia capitalize ">
        <div className="relative isolate grid  ">
          <AnimatePresence>
            {isSubmitting && (
              <>
                <div className="absolute inset-0 bg-gray-500/30 opacity-40 z-10 blur" />
                <motion.div className="absolute pointer-events-none inset-0 z-10 grid place-content-center">
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 25 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.3,
                    }}
                    className=" max-w-xs border bg-white shadow-xl shadow-green-hermine/10 rounded w-full p-3 flex gap-4 items-center text-green-hermine"
                  >
                    <span>veuillez patienter</span>
                    <span className="animate-spin p-1 origin-center "><AiOutlineLoading3Quarters /></span>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <img
            src={rings}
            draggable={false}
            alt=""
            className="mask-img3 object-contain absolute right-0 top-0  aspect-square max-h-32 opacity-40"
          />
          <img
            src={rings2}
            draggable={false}
            alt=""
            className="mask-img3 object-contain absolute left-0 bottom-0 -translate-x-5 rotate-45 opacity-35 aspect-square max-h-24"
          />
          {/* <div className="absolute top-0 left-0 w-36 translate-x-4 -z-10 rotate-12  origin-center s2  aspect-square border shadow shadow-blue-50" />
          <div className="absolute top-0 translate-y-4 -z-10 right-0 translate-x-2 w-36 rotate-12  origin-center s2  aspect-square border shadow shadow-blue-50" />
          <div className="absolute top-1/2   rotate-45 translate-x-1 -z-10 left-0 w-36   origin-center s2  aspect-square border shadow shadow-blue-50" />
          <div className="absolute bottom-0 left-1/2 -translate-y-2  rotate-45 -z-10 w-36   origin-center s2  aspect-square border shadow shadow-blue-50" /> */}
          <div />
          <div
            className={`  relative outline-none s2 border grid gap-y-5  py-6 min-h-32 ${
              screenSize < ScreenSize.MEDIUM ? "px-4" : "px-8"
            }`}
          >
              <img
                src={buttefly}
                draggable={false}
                alt=""
                className="absolute top-0 -translate-y-3 left-0  h-10 aspect-square object-scale-down "
              />
            {screenSize < ScreenSize.XLARGE && (
              <div className="font-bold heading leading-none font-lovely text-center  py-1 lowercase first-letter:uppercase">
                exprimez vos voeux
                <br />
                Aux époux
              </div>
            )}
            <div className="grid place-items-center w-fit mx-auto relative py-3">
              <img
                src={img4}
                draggable={false}
                alt=""
                className="mask-img3 object-contain w-[180px] aspect-square"
              />
              <img
                src={floral}
                draggable={false}
                alt=""
                className="absolute top-0 left-1/2 -translate-x-1/2 aspect-square w-60 object-scale-down "
              />
            

              <div className="text-center mt-10 name font-lovely font-extrabold text-green-hermine leading-none">
                Hermine & Rodrigue
              </div>
            </div>
            <textarea
              ref={messageInputRef}
              value={message}
              onInput={handleChangeMessage}
              onChange={handleChangeMessage}
              placeholder={"votre message"}
              className="w-full focus:border-emerald-400 focus:duration-100   rounded border-dashed border border-black/50 whitespace-pre-wrap leading-none break-words min-w-full px-2 py-1 min-h-48 overflow-hidden resize-none bg-transparent outline-none border-black"
            ></textarea>
            <input
              ref={authorInputRef}
              value={author}
              onInput={handleChangeAuthor}
              onChange={handleChangeAuthor}
              placeholder={"votre nom"}
              className="text-center focus:border-emerald-400 focus:duration-100 border-dashed border border-black/50 whitespace-pre-wrap leading-none break-words "
            ></input>
          </div>
        </div>
      </div>
      <button
        disabled={!message.trim() || !author.trim() || isSubmitting}
        type="submit"
        className="isolate relative w-fit disabled:bg-green-hermine/40 bg-green-hermine transition-all disabled:cursor-not-allowed disabled:text-slate-400 border  rounded items-center ml-auto gap-2 font-bold text-3xl "
      >
        <div className="flex relative items-center gap-3 py-2  text-white min-w-56 justify-center ">
          {/* <div className="absolute left-0 top-0 rotate-3 bg-green-hermine/40 -z-10 w-full h-full border" />
          <div className="absolute left-0 top-0 -rotate-3 bg-green-hermine/40 -z-10 w-full h-full border" /> */}
          <span className="font-lovely">Envoyer</span>
          <IoIosSend size={25} />
        </div>
      </button>
    </form>
  );
};

export default Post;
