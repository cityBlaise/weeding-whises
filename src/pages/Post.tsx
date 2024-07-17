import { IoIosSend } from "react-icons/io";
import { useAppSettings } from "../Context/AppSettings/AppSettings.store";
import img4 from "/img4.png";
import { ScreenSize } from "../Context/AppSettings/AppSettings";
import { FormEvent, useEffect, useRef } from "react";
import { useToast } from "../Context/Toast/Toast.store";
import { usePostMessage } from "./Post.store";
const Post = () => {
  const apiUrl = "http://localhost:3000";
  const screenSize = useAppSettings((state) => state.screenSize);
  const message = usePostMessage((state) => state.message);
  const author = usePostMessage((state) => state.author);
  const setMessage = usePostMessage((state) => state.setMessage);
  const setAuthor = usePostMessage((state) => state.setAuthor);
  const addToast = useToast((state) => state.addToast);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const authorInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, []);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) {
      addToast({ text: `svp veuillez saisir votre méssage`, type: "error" });
      messageInputRef.current!.focus();
      return;
    }
    if (!author) {
      addToast({ text: `svp renseignez  votre nom`, type: "error" });
      authorInputRef.current!.focus();
      return;
    }
    try {
      await fetch(`${apiUrl}/post`, {
        method: "POST",
        body: JSON.stringify({
          message,
          author,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setAuthor("");
      authorInputRef.current!.dispatchEvent(
        new MouseEvent("input", { bubbles: true })
      );
      setMessage("");
      messageInputRef.current!.dispatchEvent(
        new MouseEvent("input", { bubbles: true })
      );
      addToast({ text: "Message envoyé", type: "success" });
    } catch (error) {
      addToast({ text: JSON.stringify(error, null, 4), type: "error" });
    }
  };
  return (
    <form
      method="post"
      action={`${apiUrl}/post`}
      className="grid gap-y-3 h-fit p-4 mt-5 rounded max-w-3xl w-full"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="grid gap-y-2 font-josephsophia capitalize">
        <div className="relative isolate grid">
          <div className="absolute top-0 left-0 w-36 translate-x-4 -z-10 rotate-12  origin-center s2  aspect-square border shadow shadow-blue-50" />
          <div className="absolute top-0 translate-y-4 -z-10 right-0 translate-x-2 w-36 rotate-12  origin-center s2  aspect-square border shadow shadow-blue-50" />
          <div className="absolute top-1/2   rotate-45 translate-x-1 -z-10 left-0 w-36   origin-center s2  aspect-square border shadow shadow-blue-50" />
          <div className="absolute bottom-0 left-1/2 -translate-y-2  rotate-45 -z-10 w-36   origin-center s2  aspect-square border shadow shadow-blue-50" />
          <div />
          <div
            className={`border outline-none s2 grid gap-y-5  py-6 min-h-32 ${
              screenSize < ScreenSize.MEDIUM ? "px-4" : "px-8"
            }`}
          >
            {screenSize < ScreenSize.XLARGE && (
              <div className="font-bold heading leading-none font-lovely text-center border-dashed border border-black/50 py-1 lowercase first-letter:uppercase">
                exprimez vos voeux
                <br />
                Aux époux
              </div>
            )}
            <div className="grid place-items-center w-fit mx-auto">
              <img
                src={img4}
                draggable={false}
                alt=""
                className="mask-img3 object-contain aspect-square max-h-40"
              />
              <div className="text-center name font-lovely font-bold leading-none">
                nani & nino
              </div>
            </div>
            <textarea
              ref={messageInputRef}
              value={message}
              onInput={(e) => {
                setMessage(
                  e.currentTarget.value.trim() == ""
                    ? ""
                    : e.currentTarget.value
                );
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height =
                  e.currentTarget.scrollHeight + "px";
              }}
              onChange={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height =
                  e.currentTarget.scrollHeight + "px";
              }}
              placeholder={"votre message"}
              className="w-full whitespace-pre-wrap leading-none break-words min-w-full px-2 py-1 min-h-48 overflow-hidden resize-none bg-transparent outline-none border-black"
            ></textarea>
            <input
              ref={authorInputRef}
              value={author}
              onInput={(e) => {
                setAuthor(
                  e.currentTarget.value.trim() == ""
                    ? ""
                    : e.currentTarget.value
                );
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height =
                  e.currentTarget.scrollHeight + "px";
              }}
              placeholder={"votre nom"}
              className="text-right border-none"
            ></input>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="isolate relative w-fit  items-center ml-auto gap-2   px-2 py-2 font-bold text-3xl "
      >
        <div className="flex relative items-center gap-3 py-2 s2 min-w-56 justify-center border  rounded">
          <div className="absolute left-0 top-0 rotate-3 bg-white -z-10 w-full h-full border" />
          <div className="absolute left-0 top-0 -rotate-3 bg-white -z-10 w-full h-full border" />
          <span className="font-lovely">Envoyer</span>
          <IoIosSend size={25} />
        </div>
      </button>
    </form>
  );
};

export default Post;
