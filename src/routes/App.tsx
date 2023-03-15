import { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";
import useDarkMode from "../custom-hooks/useDarkMode";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase";
import useHandleShortcut from "../custom-hooks/useHandleShortcut";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSearchbar,
  openSearchbar,
  selectSearchbar,
} from "../redux/searchbarSlice";
import { closePopup, openPopup, selectPopup } from "../redux/popupSlice";
import RulesPopUp from "../components/RulesPopUp";
import SearchUser from "../components/SearchUser";

export async function loader({ request }: any) {
  const url = new URL(request.url);
  const search: string | null = url.searchParams.get("search");
  return search;
}

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [closeUsers, setCloseUsers] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const showSearchbar = useSelector(selectSearchbar);
  const showPopup = useSelector(selectPopup);
  const dispatch = useDispatch();
  const [] = useHandleShortcut({
    userAction: "'",
    actionFunction: handleShortcutFunction,
    useCtrlKey: true,
  });
  const [darkMode, setDarkMode] = useDarkMode();
  const [user, loading] = useAuthState(firebaseAuth as any);
  const navigate = useNavigate();
  const search: any = useLoaderData();

  //todo: custom alert - not done
  //todo: add private messaging - not done
  //todo: markdown on sending messages - not done
  //todo: message replying
  //todo: right click on user to view profile or go to message - not done
  //todo: add lazy loading - not done
  //todo: add message notification - not done

  function handleShortcutFunction() {
    console.log(showSearchbar);
    const searchObj = document.getElementById("search") as HTMLInputElement;

    dispatch(openSearchbar());
    searchObj?.focus();
  }

  useEffect(() => {
    const data = localStorage.getItem("expandSidebar");
    if (data === null && window.innerWidth > 1200) {
      setExpandSidebar(true);
    } else if (data === "true" && window.innerWidth > 1200) {
      setExpandSidebar(true);
    } else {
      setExpandSidebar(false);
    }
  }, []);

  //handles the rules popup
  useEffect(() => {
    const data = localStorage.getItem("firsttimevisitor");

    if (data === null) {
      dispatch(openPopup());
      localStorage.setItem("firsttimevisitor", "false");
    }
  }, []);

  //this is basically so that if the dude types in something to the searchbar it sets that string to the searches value
  useEffect(() => {
    const searchObj = document.getElementById("search") as HTMLInputElement;
    searchObj ? (searchObj.value = search) : null;
  }, [search]);

  useEffect(() => {
    if (!loading) {
      !user && navigate("/login");
    }
  }, [user, loading]);

  return (
    <div
      className={` guaranteed-transition app menu relative h-screen
       bg-zinc-200/50 text-zinc-700  dark:bg-zinc-800  dark:text-white [&>*]:transition [&>*]:duration-500
      ${expandSidebar ? "openSidebar" : "closedSidebar"}  `}
    >
      <Sidebar
        expandSidebar={expandSidebar}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
        setExpandSidebar={setExpandSidebar}
        closeUsers={closeUsers}
        setCloseUsers={setCloseUsers}
      />
      <Outlet />
      <Users search={search} />

      <RulesPopUp
        isPopUpOpen={showPopup}
        closePopUp={() => dispatch(closePopup())}
      />

      <SearchUser />
    </div>
  );
}

export default App;
