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
      className={` 
     flex items-center phoneBug:mt-7 ${
       props.hidden ? "hidden phoneBug:flex ml-6 phoneBug:ml-0" : ""
     }   mt-0  cursor-pointer
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
