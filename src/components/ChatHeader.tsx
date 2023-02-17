import { CameraAlt, Phone } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useLocation } from "react-router-dom";

function ChatHeader() {
  const location = useLocation();
  console.log(location);
  return (
    <div
      className=" flex  dark:zincbg z-10    h-12 border-b-zinc-300  transition transition-700
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
            <Avatar sx={{ width: 34, height: 34 }} />
            <span className="ml-3">SomeUser</span>
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
