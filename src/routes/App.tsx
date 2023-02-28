import { useEffect, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";
import UseDarkMode from "../custom-hooks/UseDarkMode";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase";
import useHandleShortcut from "../custom-hooks/useHandleShortcut";
import { useDispatch, useSelector } from "react-redux";
import { openSearchbar, selectSearchbar } from "../redux/searchbarSlice";

export async function loader({ request }: any) {
  const url = new URL(request.url);
  const search: string | null = url.searchParams.get("search");
  return search;
}

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [closeUsers, setCloseUsers] = useState(false);
  const showSearchbar = useSelector(selectSearchbar);
  const dispatch = useDispatch();
  const [] = useHandleShortcut({
    userAction: "'",
    actionFunction: handleShortcutFunction,
    useCtrlKey: true,
  });
  const [darkMode, setDarkMode] = UseDarkMode();
  const [user, loading] = useAuthState(firebaseAuth as any);
  const navigate = useNavigate();
  const search: any = useLoaderData();

  //todo: rules dropdown
  //todo: push to db doc by id
  //todo: profiles
  //todo right click on user to view profile or go to message
  //todo: add lazy loading

  function handleShortcutFunction() {
    const searchObj = document.getElementById("search") as HTMLInputElement;
    if (showSearchbar) {
      searchObj.focus();
    } else {
      dispatch(openSearchbar());
      searchObj.focus();
    }
  }

  //this is basically so that if the dude types in something to the searchbar it sets that string to the searches value
  useEffect(() => {
    const searchObj = document.getElementById("search") as HTMLInputElement;
    searchObj.value = search;
  }, [search]);

  useEffect(() => {
    if (!loading) {
      !user && navigate("/login");
    }
  }, [user, loading]);

  return (
    <div
      className={` guaranteed-transition app menu h-screen 
       bg-zinc-200/50 text-zinc-700  dark:bg-zinc-800 dark:text-white [&>*]:transition [&>*]:duration-500
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
    </div>
  );
}

export default App;
