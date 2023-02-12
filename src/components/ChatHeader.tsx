import { CameraAlt, Phone } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

function ChatHeader() {
  return (
    <div
      className=" flex  bg-[#212124] z-10  h-14 
        top-0 sticky  p-4  border-b-2 border-zinc-700   items-center justify-between "
    >
      <div className="flex items-center">
        <Avatar sx={{ width: 34, height: 34 }} />{" "}
        <span className="ml-2">SomeUser</span>{" "}
      </div>
      <div>
        <Phone />
        <CameraAlt className="ml-4" />
      </div>
    </div>
  );
}

export default ChatHeader;
