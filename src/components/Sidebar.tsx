import { DarkMode, LightMode, Search } from "@mui/icons-material";
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
  expandSidebar: boolean;
  setExpandSidebar: Dispatch<SetStateAction<boolean>>;
  setDarkMode: any;
  darkMode: boolean | VoidFunction;
}) {
  return (
    <div
      className={`flex  dark:bg-zinc-900/40 dark:border-none border-r-zinc-300 border-r-2    py-10
       ${props.expandSidebar ? "pl-14" : "items-center"} flex-col`}
    >
      <div className={`${props.expandSidebar ? " scale-110" : ""}`}>
        <IconButton>
          {" "}
          <DeblurIcon />
        </IconButton>
      </div>

      <div className={`mt-12 ${props.expandSidebar ? " mt-16" : ""}`}>
        <SidebarOption
          text="Search "
          expandSidebar={props.expandSidebar}
          Icon={<SearchIcon />}
        />

        <SidebarOption
          text="Explore"
          expandSidebar={props.expandSidebar}
          Icon={<ExploreIcon />}
        />
        <SidebarOption
          text="Videos "
          expandSidebar={props.expandSidebar}
          Icon={<SlowMotionVideoIcon />}
        />
        <SidebarOption
          text="Messages "
          expandSidebar={props.expandSidebar}
          Icon={<MessageIcon />}
        />
        <SidebarOption
          text="Likes "
          expandSidebar={props.expandSidebar}
          Icon={<FavoriteBorderIcon />}
        />
        <SidebarOption
          text="Create "
          expandSidebar={props.expandSidebar}
          Icon={<AddCircleOutlineIcon />}
        />
        {props.darkMode ? (
          <div onClick={props.setDarkMode}>
            <SidebarOption
              text="Light Mode "
              expandSidebar={props.expandSidebar}
              Icon={<LightMode />}
            />
          </div>
        ) : (
          <div onClick={props.setDarkMode}>
            <SidebarOption
              text="Dark Mode "
              expandSidebar={props.expandSidebar}
              Icon={<DarkMode />}
            />
          </div>
        )}
      </div>

      <div className={` mt-auto ${props.expandSidebar ? " scale-110" : ""}`}>
        {" "}
        <IconButton
          onClick={() =>
            props.setExpandSidebar((expandSidebar) =>
              window.innerWidth > 1200 ? !expandSidebar : false
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
