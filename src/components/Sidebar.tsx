import { Search } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { Dispatch, SetStateAction, useState } from "react";
import logo from "/sitelogo.png";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import DeblurIcon from "@mui/icons-material/Deblur";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import SidebarOption from "./SidebarOption";

function Sidebar(props: {
  showUsers: boolean;
  setShowUsers: Dispatch<SetStateAction<boolean>>;
}) {
  const [expandSidebar, setExpandSidebar] = useState(false);

  return (
    <div
      className={` transition-all z-10 absolute phoneBug:relative bottom-0
        bg-zinc-900/40  ease-in-out  duration-700  ${
          expandSidebar ? "flex-[0.2]" : "flex-[0]"
        }`}
    >
      <div
        className={` relative w-screen phoneBug:w-auto phoneBug:h-full
         justify-center phoneBug:justify-start   phoneBug:pb-0  
             transition delay-1000  bg-zinc-900/40   grid-cols-2 
        ${expandSidebar ? "py-8 px-16" : " items-center px-3   phoneBug:py-10"} 
        flex phoneBug:flex-col flex-wrap   p-5 `}
      >
        <div
          className={` phoneBug:mt-0 mr-6 phoneBug:mr-0 mt-auto
        ${expandSidebar ? "scale-125 " : "scale-110"} 
        
       `}
        >
          <IconButton>
            {" "}
            <DeblurIcon />
          </IconButton>
        </div>

        <div
          className={` flex gap-5 phoneBug:gap-0 flex-wrap  phoneBug:flex-col ${
            expandSidebar ? " phoneBug:mt-16  " : "  phoneBug:mt-12 "
          } `}
        >
          <SidebarOption
            text="Search "
            hidden={true}
            expandSidebar={expandSidebar}
            Icon={<SearchIcon />}
          />

          <div
            onClick={() => props.setShowUsers(!props.showUsers)}
            className={` 

     phoneBug:hidden flex items-center phoneBug:mt-7  scale-110  mt-0  cursor-pointer
    
   `}
          >
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>

          <SidebarOption
            text="Explore"
            hidden={true}
            expandSidebar={expandSidebar}
            Icon={<ExploreIcon />}
          />
          <SidebarOption
            text="Videos "
            hidden={true}
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
            hidden={true}
            expandSidebar={expandSidebar}
            Icon={<FavoriteBorderIcon />}
          />
          <SidebarOption
            text="Create "
            expandSidebar={expandSidebar}
            hidden={true}
            Icon={<AddCircleOutlineIcon />}
          />
        </div>

        <div
          className={`  mt-auto phoneBug:mb-6 ml-6 phoneBug:ml-0
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
