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
      className={` mt-6 flex group relative transition-opacity  cool ${
        props.expandSidebar ? " scale-110" : ""
      } items-center`}
    >
      {" "}
      <IconButton>{props.Icon}</IconButton>
      {props.expandSidebar ? (
        <p className="active:scale-90 text-sm cursor-pointer">{props.text}</p>
      ) : (
        <div
          className="hidden group-hover:flex  min-w-max   px-3 p-2 rounded-md 
        absolute items-center ml-14 dark:bg-zinc-900 bg-zinc-200 z-10  "
        >
          {props.text}
        </div>
      )}
    </div>
  );
}

export default SidebarOption;
