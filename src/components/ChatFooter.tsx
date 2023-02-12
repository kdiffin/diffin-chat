import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { Create } from "@mui/icons-material";

function ChatFooter(props: {
  sendPost: MouseEventHandler<HTMLButtonElement> | undefined;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className=" bg-zinc-800 p-1 pb-3  z-10  sticky bottom-0  flex items-center justify-center">
      <div className=" p-2 my- bg-[#212124] sticky bottom w-[96%]   rounded-lg text-white ">
        <div className="  rounded-3xl  flex p-3  ">
          <Create />
          <form className="flex flex-1    ">
            <input
              spellCheck="false"
              type="text"
              className="border-0 bg-transparent flex-1  ml-2 outline-none font-semibold "
              value={props.input}
              onChange={(e) => props.setInput(e.target.value)}
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
