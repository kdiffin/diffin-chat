import React from "react";
import IconButton from "@mui/material/IconButton";
import { ListItem } from "@mui/material";

function SidebarOption(props: {
  Icon: React.ReactElement;
  expandSidebar: boolean;
  text: string;
  clickAction?: VoidFunction;
}) {
  return (
    <div
      onClick={props.clickAction}
      className={` group relative mt-6 flex  cursor-pointer     ${
        props.expandSidebar ? " scale-110  active:scale-105" : ""
      } items-center`}
    >
      {" "}
      <IconButton>{props.Icon}</IconButton>
      {props.expandSidebar ? (
        <p className="cursor-pointer text-sm active:scale-90">{props.text}</p>
      ) : (
        <div
          className="absolute z-50   ml-14   hidden min-w-max items-center 
        rounded-md bg-zinc-200 p-2 px-3 group-hover:flex dark:bg-zinc-900  "
        >
          {props.text}
        </div>
      )}
    </div>
  );
}

export default SidebarOption;
