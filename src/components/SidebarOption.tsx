import React from "react";
import IconButton from "@mui/material/IconButton";
import { ListItem } from "@mui/material";

function SidebarOption(props: {
  Icon: React.ReactElement;
  expandSidebar: boolean;
  text: string;
  hidden?: boolean;
}) {
  return (
    <div
      className={` mt-6 flex  ${
        props.expandSidebar ? " scale-110" : ""
      } items-center`}
    >
      {" "}
      <IconButton>{props.Icon}</IconButton>
      {props.expandSidebar ? (
        <p className="active:scale-90 text-sm">{props.text}</p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SidebarOption;
