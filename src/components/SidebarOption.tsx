import React from "react";
import IconButton from "@mui/material/IconButton";
import { ListItem } from "@mui/material";

function SidebarOption(props: {
  Icon: React.ReactElement;
  expandSidebar: boolean;
  text: string;
}) {
  return (
    <div
      className={` 
    flex items-center   mt-7 cursor-pointer
    ${props.expandSidebar ? "scale-125" : "scale-110"} 
    
   `}
    >
      {" "}
      <IconButton>{props.Icon}</IconButton>
      {props.expandSidebar ? (
        <p className="text-[13px] active:scale-90 ml-2">{props.text}</p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SidebarOption;
