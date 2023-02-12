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

function Sidebar() {
  const [expandSidebar, setExpandSidebar] = useState(false);

  return (
    <div className="flex  bg-zinc-900/40 ease-in-out      duration-700  py-10 items-center flex-col">
      <div className=" ">
        <IconButton>
          {" "}
          <DeblurIcon />
        </IconButton>
      </div>

      <div className="mt-12">
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

      <div className=" mt-auto ">
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
  );
}

export default Sidebar;
