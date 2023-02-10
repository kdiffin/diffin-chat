import { CameraAlt, Phone } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

function ChatHeader() {
  return (
    <div className="flex p-4 h-14 border-b-2 border-zinc-700   items-center bg-zinc-900/40">
      <Avatar sx={{ width: 34, height: 34 }} />{" "}
      <span className="ml-4 font-semibold">SomeUser</span>{" "}
      <div className="ml-auto">
        {" "}
        <Phone />
        <CameraAlt className="ml-4" />
      </div>
    </div>
  );
}

export default ChatHeader;
