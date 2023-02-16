import { DarkMode, LightMode, Logout, Search } from "@mui/icons-material";
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
import { Link } from "react-router-dom";
import { firebaseAuth } from "../firebase";

function Sidebar(props: {
  expandSidebar: boolean;
  setExpandSidebar: Dispatch<SetStateAction<boolean>>;
  setDarkMode: any;
  darkMode: boolean | VoidFunction;
}) {
  function signOut() {
    firebaseAuth.signOut().catch((error) => alert(error.message));
  }

  return (
    <div
      className={`flex  dark:bg-zinc-900/40 dark:border-none  border-r-zinc-300 border-r-2    py-10
       ${props.expandSidebar ? "pl-14" : "items-center"} flex-col`}
    >
      <Link to="/" className={`${props.expandSidebar ? " scale-110" : ""}`}>
        <IconButton>
          {" "}
          <DeblurIcon />
        </IconButton>
      </Link>

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
          text="Create "
          expandSidebar={props.expandSidebar}
          Icon={<AddCircleOutlineIcon />}
        />

        <SidebarOption
          clickAction={signOut}
          text="Logout "
          expandSidebar={props.expandSidebar}
          Icon={<Logout />}
        />

        {props.darkMode ? (
          <SidebarOption
            clickAction={props.setDarkMode}
            text="Light Mode "
            expandSidebar={props.expandSidebar}
            Icon={<LightMode />}
          />
        ) : (
          <SidebarOption
            clickAction={props.setDarkMode}
            text="Dark Mode "
            expandSidebar={props.expandSidebar}
            Icon={<DarkMode />}
          />
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
