import React, {
  Dispatch,
  forwardRef,
  MouseEventHandler,
  SetStateAction,
} from "react";
import { Create } from "@mui/icons-material";

function ChatFooter(
  //u need to do this weird props and ref thing for forward ref to work
  props: {
    sendPost: MouseEventHandler<HTMLButtonElement>;
  },

  ref: React.LegacyRef<HTMLInputElement> | undefined
) {
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
              ref={ref}
              className="border-0 bg-transparent flex-1  ml-2 outline-none font-semibold "
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

//forward ref gives the ref to the parent component, u need to use this when passing down refs
const forwardChatFooter = forwardRef(ChatFooter);

export default forwardChatFooter;
