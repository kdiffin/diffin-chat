import { Create } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import ChatHeader from "./ChatHeader";

function Chat() {
  const [input, setInput] = useState("");

  function sendPost(e: any) {
    e.preventDefault();
  }

  return (
    <div className="flex-1 flex  bg-zinc-800  flex-col">
      <ChatHeader />

      {/* this is where the messages  go */}
      <div className="flex-1 bg-zinc-900/10  p-5 pb-2 flex flex-col">
        <div className="flex-1">ya</div>

        <div className="bg-zinc-900/40 p-2   rounded-lg text-white ">
          <div className="pl-4  rounded-3xl  flex p-3 md:p-4 ">
            <Create />
            <form className="flex    ">
              <input
                spellCheck="false"
                type="text"
                className="border-0 bg-transparent flex-1 ml-2 outline-none font-semibold "
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Submit a post"
              />
              <button type="submit" className=" hidden" onClick={sendPost}>
                send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
