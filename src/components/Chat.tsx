import { Avatar } from "@mui/material";
import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";

function Chat() {
  const [input, setInput] = useState("");

  function sendPost(e: any) {
    e.preventDefault();
  }

  return (
    <div className="chat__container   overflow-overlay   col-span-1 ">
      <ChatHeader />

      {/* this is where the messages  go */}

      <div className="px-6 p-1 relative ">
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
      </div>

      <ChatFooter input={input} setInput={setInput} sendPost={sendPost} />
    </div>
  );
}

export default Chat;
