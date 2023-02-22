import { CameraAlt, Info, Phone, Radar, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
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

      <Form
        className={`${showSearchbar ? " openSearchbar " : " closeSearchbar  "} 
        chatInput__background items-center px-5 p-1 hover-info-container relative
          dark:bg-zinc-700 bg-zinc-300 justify-center rounded-md flex `}
        id="search-form"
        role="search"
        //automatically submits the form when typing and removes useless history
      >
        <Search fontSize="small" className="text-zinc-400"></Search>
        <input
          id="search"
          defaultValue={search}
          placeholder="find user"
          className="w-full   outline-none h-inherit   focus:bg-zinc-600 bg-inherit rounded-lg "
          autoComplete="off"
          spellCheck="false"
          type="text"
          onChange={(event) => {
            const isFirstSearch = search == null;
            submit(event.currentTarget.form, {
              replace: !isFirstSearch,
            });
          }}
          name="search"
        />
        <Info className="text-zinc-500 cursor-help  italic !text-[20px] hover-info " />
        <div
          className="opacity-0   min-w-max info-tooltip  px-3 p-2 text-sm rounded-md transition-all duration-300 
        absolute items-center top-12 right-0 dark:bg-zinc-900/80 text-zinc-300 italic bg-zinc-200 z-10  "
        >
          to automatically use the searchbar, use ctrl+k
        </div>{" "}
      </Form>

      <div>
        <Phone className="!hidden sm:!inline" />

        <CameraAlt className="ml-4 !hidden sm:!inline" />
      </div>
    </div>
  );
}

export default ChatHeader;
