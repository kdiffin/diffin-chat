import { DarkMode, LightMode, Logout, Search } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { Dispatch, SetStateAction, useReducer, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import DeblurIcon from "@mui/icons-material/Deblur";
import MessageIcon from "@mui/icons-material/Message";
import { useDispatch, useSelector } from "react-redux";

import SidebarOption from "./SidebarOption";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../firebase";
import {
  closeSearchbar,
  openSearchbar,
  selectSearchbar,
} from "../redux/searchbarSlice";

function Sidebar(props: {
  expandSidebar: boolean;
  setExpandSidebar: Dispatch<SetStateAction<boolean>>;
  setDarkMode: any;
  darkMode: boolean | VoidFunction;
}) {
  const showSearchbar = useSelector(selectSearchbar);
  const dispatch = useDispatch();

  function showSearch() {
    showSearchbar ? dispatch(closeSearchbar()) : dispatch(openSearchbar());
  }

  console.log(showSearchbar);

  function signOut() {
    firebaseAuth.signOut().catch((error) => alert(error.message));
  }

  return (
    <div
      className={`flex  dark:zincbg dark:border-none  border-r-zinc-300 border-r-2    py-10
       ${props.expandSidebar ? "pl-14" : "items-center"} flex-col`}
    >
      <Link to="/" className={`${props.expandSidebar ? " scale-110" : ""}`}>
        <IconButton>
          {" "}
          <DeblurIcon />
        </IconButton>
      </Link>

      <div
        className={`mt-12 flex flex-col justify-center last:mb-4  ${
          props.expandSidebar ? " mt-16" : " items-center "
        }`}
      >
        <SidebarOption
          text="Search "
          clickAction={showSearch}
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
        <Link to="/">
          <SidebarOption
            text="Global Chat "
            expandSidebar={props.expandSidebar}
            Icon={<MessageIcon />}
          />
        </Link>
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

      <div className={` mt-auto  ${props.expandSidebar ? " scale-110" : ""}`}>
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
