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
  openPopUp: VoidFunction;
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
      items-center    justify-between border-b-2  border-b-zinc-300 bg-[#ececee]   p-4 py-7   
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
            <Avatar sx={{ width: 34, height: 34 }} src={props.userAvatar} />
            <span className="ml-3">{props.userName}</span>
          </>
        )}
      </div>

      <Form
        className={`${showSearchbar ? " openSearchbar " : " closeSearchbar  "} 
        chatInput__background hover-info-container relative flex items-center justify-center
          rounded-md bg-zinc-300 p-1 px-5 dark:bg-zinc-700 `}
        id="search-form"
        role="search"
        //automatically submits the form when typing and removes useless history
      >
        <Search fontSize="small" className="text-zinc-400"></Search>
        <input
          id="search"
          defaultValue={search}
          placeholder="find user"
          className="h-inherit   w-full rounded-lg   bg-inherit outline-none focus:bg-zinc-600 "
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
        <Info className="hover-info cursor-help !text-[20px]  italic text-zinc-400 dark:text-zinc-500 " />
        <div
          className="info-tooltip   absolute top-12  right-0 z-10 mt-2 min-w-max items-center rounded-md 
        bg-zinc-200 p-2 px-3 text-sm italic text-zinc-800 opacity-0 transition-all duration-300 dark:bg-zinc-900/80 dark:text-zinc-300  "
        >
          to automatically use the searchbar, use ctrl+"
        </div>{" "}
      </Form>

      <div>
        {/* <Phone className="!hidden sm:!inline" /> */}
        <IconButton onClick={props.openPopUp}>
          <Info className="ml-4 !hidden sm:!inline" />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatHeader;
