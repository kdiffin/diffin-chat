import { CameraAlt, Phone, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSearchbar } from "../redux/searchbarSlice";

function ChatHeader(props: {
  userAvatar?: string;
  userName?: string;
  search?: boolean;
}) {
  const location = useLocation();

  const showSearchbar = useSelector(selectSearchbar);

  return (
    <div
      className=" flex  dark:zincbg z-10   h-12 border-b-zinc-300  transition transition-700
      bg-[#ececee]    top-0 sticky  p-4 py-7   border-b-2 dark:border-zinc-700   
      items-center justify-between "
    >
      <div className="flex items-center">
        {location.pathname === "/" ? (
          <>
            <LanguageIcon />
            <span className="ml-3">Global Chat</span>
          </>
        ) : (
          <>
            <Avatar sx={{ width: 34, height: 34 }} src={props.userAvatar} />
            <span className="ml-3">{props.userName}</span>
          </>
        )}
      </div>
      <div
        className={`${showSearchbar ? " openSearchbar " : " closeSearchbar  "} 
        chatInput__background items-center px-5 p-1
          dark:bg-zinc-700 bg-zinc-300 justify-center rounded-md flex `}
      >
        <Search fontSize="small" className="text-zinc-400"></Search>
        <input
          type="text"
          className="w-full   outline-none h-inherit  focus:bg-zinc-600 bg-inherit rounded-lg "
          autoComplete="off"
          spellCheck="false"
          placeholder="find user"
        />
      </div>

      <div>
        <Phone />

        <CameraAlt className="ml-4" />
      </div>
    </div>
  );
}

export default ChatHeader;
