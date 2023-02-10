import { Search } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState } from "react";
import logo from "/sitelogo.png";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import DeblurIcon from "@mui/icons-material/Deblur";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import SidebarOption from "./SidebarOption";

function Sidebar() {
  const [expandSidebar, setExpandSidebar] = useState(false);

  return (
    <div
      className={` transition-all  bg-zinc-900/40  ease-in-out  duration-700  ${
        expandSidebar ? "flex-[0.2]" : "flex-[0]"
      }`}
    >
      <div
        className={` relative  h-full    transition delay-1000  bg-zinc-900/40   grid-cols-2 
        ${expandSidebar ? "py-8 px-16" : " items-center px-3   py-10"} 
        flex flex-col   p-5 `}
      >
        <div
          className={` 
        ${expandSidebar ? "scale-125 " : "scale-110"} 
        
       `}
        >
          <IconButton>
            {" "}
            <DeblurIcon />
          </IconButton>
        </div>

        <div className={`  ${expandSidebar ? " mt-16  " : "  mt-12 "} `}>
          <SidebarOption
            text="Search "
            expandSidebar={expandSidebar}
            Icon={<SearchIcon />}
          />
          <SidebarOption
            text="Explore"
            expandSidebar={expandSidebar}
            Icon={<ExploreIcon />}
          />
          <SidebarOption
            text="Videos "
            expandSidebar={expandSidebar}
            Icon={<SlowMotionVideoIcon />}
          />
          <SidebarOption
            text="Messages "
            expandSidebar={expandSidebar}
            Icon={<MessageIcon />}
          />
          <SidebarOption
            text="Likes "
            expandSidebar={expandSidebar}
            Icon={<FavoriteBorderIcon />}
          />
          <SidebarOption
            text="Create "
            expandSidebar={expandSidebar}
            Icon={<AddCircleOutlineIcon />}
          />
        </div>

        <div
          className={`  mt-auto
    ${expandSidebar ? "scale-125  " : "scale-110 "} 
    
   `}
        >
          {" "}
          <IconButton
            onClick={() =>
              setExpandSidebar((expandSidebar) =>
                window.innerWidth > 900 ? !expandSidebar : false
              )
            }
          >
            <MenuIcon />{" "}
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
