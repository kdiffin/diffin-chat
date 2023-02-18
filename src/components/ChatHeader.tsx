import { CameraAlt, Phone } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useLocation } from "react-router-dom";

function ChatHeader(props: { userAvatar?: string; userName?: string }) {
  const location = useLocation();
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
      <div>
        <Phone />
        <CameraAlt className="ml-4" />
      </div>
    </div>
  );
}

export default ChatHeader;
