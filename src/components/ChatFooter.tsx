import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { Create } from "@mui/icons-material";

function ChatFooter(props: {
  sendPost: MouseEventHandler<HTMLButtonElement> | undefined;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}) {
  function changeMessage(e: {
    target: { value: React.SetStateAction<string> };
  }) {
    if (props.input.length > 999) {
      props.setInput("");
      alert("no sending insanely long messages!");
    }
    //okay i know this is HELLA goofy but i cant be bothered to learn how to trim useless whitespace right now
    else if (props.input > " " || "  " || "   " || "    ") {
      props.setInput("");
      alert("dont send that bro");
    } else {
      props.setInput(e.target.value);
    }
  }

  return (
    <div
      className=" dark:bg-zinc-800 transition duration-500  p-1  pb-3  z-10
      sticky bottom-0        bg-[#ececee]  flex items-center justify-center"
    >
      <div
        className=" p-2 my- dark:zincbg transition duration-500 sticky bottom 
      bg-zinc-200 w-[96%] border-2 dark:border-none   rounded-lg dark:text-white "
      >
        <div className="  rounded-3xl  flex p-3  ">
          <Create />
          <form className="flex flex-1    ">
            <input
              spellCheck="false"
              type="text"
              className="border-0 bg-transparent flex-1  ml-2 outline-none font-semibold "
              value={props.input}
              onChange={changeMessage}
              placeholder="Submit a post"
            />
            <button type="submit" className=" hidden" onClick={props.sendPost}>
              send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatFooter;
