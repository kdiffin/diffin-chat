import { CameraAlt, Info, Phone, Radar, Search } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import {
  Form,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSearchbar } from "../redux/searchbarSlice";

function ChatHeader(props: {
  userAvatar?: string;
  userName?: string;
  openPopUp?: VoidFunction;
  search?: boolean;
}) {
  const location = useLocation();
  //we get the callback for this from main.tsx app routes id
  //this is the app components loader data
  const search: any = useRouteLoaderData("app");
  const submit = useSubmit();
  const navigation = useNavigation();

  const showSearchbar = useSelector(selectSearchbar);

  return (
    <div
      className=" dark:zincbg  transition-700 sticky   top-0 z-10  flex h-12
      items-center justify-between border-b-2 border-b-zinc-300 bg-[#ececee]   p-4 py-7   
      transition dark:border-zinc-700 "
    >
      <div className="flex items-center">
        {location.pathname === "/" ? (
          <>
            <LanguageIcon />
            <span className="ml-3">Global Chat</span>
          </>
        ) : (
          <>
            <Avatar sx={{ width: 34, height: 34 }} src={props.userAvatar}>
              {/* add the name stuff here */}
            </Avatar>
            <span className="ml-3">{props.userName}</span>
          </>
        )}
      </div>

      {/* <Phone className="!hidden sm:!inline" /> */}
      <IconButton onClick={props.openPopUp}>
        <Info />
      </IconButton>
    </div>
  );
}

export default ChatHeader;
