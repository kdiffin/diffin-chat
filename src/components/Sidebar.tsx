import { DarkMode, Info, LightMode, Logout } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Dispatch, SetStateAction } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import DeblurIcon from "@mui/icons-material/Deblur";
import MessageIcon from "@mui/icons-material/Message";
import { useDispatch, useSelector } from "react-redux";

import SidebarOption from "./ui/SidebarOption";
import { Link, useSearchParams } from "react-router-dom";
import { firebaseAuth, firebaseDb } from "../firebase";
import {
  closeSearchbar,
  openSearchbar,
  selectSearchbar,
} from "../redux/searchbarSlice";
import popupSlice, { openPopup, selectPopup } from "../redux/popupSlice";
import { Avatar } from "@mui/material";
import { useDocument } from "react-firebase-hooks/firestore";
import useGetActualUser from "../custom-hooks/useGetActualUser";

function Sidebar(props: {
  expandSidebar: boolean;
  setExpandSidebar: Dispatch<SetStateAction<boolean>>;
  setDarkMode: any;
  darkMode: boolean | VoidFunction;
  setCloseUsers: Dispatch<SetStateAction<boolean>>;
  closeUsers: boolean;
}) {
  const showSearchbar = useSelector(selectSearchbar);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    selfUserData,
    selfUserInfo,
    selfUserInfoLoading,
    profileName,
    profilePic,
  } = useGetActualUser();

  function closeSearchbarFunc() {
    dispatch(closeSearchbar());
    setSearchParams("");
  }

  function openSidebar() {
    if (!props.expandSidebar && window.innerWidth > 1200) {
      props.setExpandSidebar(true);
      localStorage.setItem("expandSidebar", "true");
    } else {
      props.setExpandSidebar(false);
      localStorage.setItem("expandSidebar", "false");
    }
  }

  function showSearch() {
    showSearchbar ? closeSearchbarFunc() : dispatch(openSearchbar());
  }

  function signOut() {
    firebaseAuth.signOut().catch((error) => console.error(error));
  }

  return (
    <div
      className={`dark:zincbg  flex border-r-2 border-r-zinc-300 py-10 transition-all dark:border-none 
       ${props.expandSidebar ? "pl-14 " : "items-center "} flex-col`}
    >
      <Link to="/" className={`${props.expandSidebar ? " scale-110" : ""}`}>
        <IconButton>
          {" "}
          <DeblurIcon />
        </IconButton>
      </Link>

      <div
        className={`mt-12 flex flex-col justify-center   last:mb-4  ${
          props.expandSidebar ? " mt-16" : " items-center "
        }`}
      >
        <SidebarOption
          text="Search "
          clickAction={showSearch}
          expandSidebar={props.expandSidebar}
          Icon={<SearchIcon />}
        />

        <Link to="/all-posts">
          <SidebarOption
            text="All Posts"
            expandSidebar={props.expandSidebar}
            Icon={<SlowMotionVideoIcon />}
          />
        </Link>

        <Link to="/">
          <SidebarOption
            text="Global Chat "
            expandSidebar={props.expandSidebar}
            Icon={<MessageIcon />}
          />
        </Link>

        <SidebarOption
          text="Rules"
          expandSidebar={props.expandSidebar}
          Icon={<Info />}
          clickAction={() => dispatch(openPopup())}
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

        <Link to="/create-post">
          <SidebarOption
            text="Create Post"
            expandSidebar={props.expandSidebar}
            Icon={<AddCircleOutlineIcon />}
          />
        </Link>

        <Link to="/me">
          <SidebarOption
            text="Account "
            expandSidebar={props.expandSidebar}
            Icon={
              <Avatar src={profilePic} className="!h-8 !w-8 lowercase">
                {profileName ? profileName[0] + profileName[1] : null}
              </Avatar>
            }
          />
        </Link>
      </div>

      <div className={` mt-auto  ${props.expandSidebar ? " scale-110" : ""}`}>
        {" "}
        <IconButton onClick={openSidebar}>
          <MenuIcon />{" "}
        </IconButton>
      </div>
    </div>
  );
}

export default Sidebar;
