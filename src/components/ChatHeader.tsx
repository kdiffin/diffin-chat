import { CameraAlt, Phone } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

function ChatHeader() {
  return (
    <div
      className=" flex  dark:bg-[#212124] z-10    h-12 border-b-zinc-300  
      bg-[#ececee]    top-0 sticky  p-4 py-7   border-b-2 dark:border-zinc-700   items-center justify-between "
    >
      <div className="flex items-center">
        <Avatar sx={{ width: 34, height: 34 }} />{" "}
        <span className="ml-3">SomeUser</span>{" "}
      </div>
      <div>
        <Phone />
        <CameraAlt className="ml-4" />
      </div>
    </div>
  );
}

export default ChatHeader;
