import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";
import UseDarkMode from "../custom-hooks/UseDarkMode";
import { SignInWithPopupHook, useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase";

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [darkMode, setDarkMode] = UseDarkMode();
  const [user, loading] = useAuthState(firebaseAuth as any);
  const navigate = useNavigate();

  //todos: add logout button on sidebar
  //make it so that it pushes a user to ur db when u click login, which u then render out in the users thing

  useEffect(() => {
    if (!loading) {
      !user?.displayName ? navigate("/Login") : navigate("/");
    }
  }, [user]);

  console.log(darkMode);

  return (
    <div
      className={` dark:bg-zinc-800 dark:text-white  bg-zinc-200/50 text-zinc-700 [&>*]:transition [&>*]:duration-500  app  transition duration-500
      ${expandSidebar ? "openSidebar" : " closedSidebar"}  h-screen `}
    >
      <Sidebar
        expandSidebar={expandSidebar}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
        setExpandSidebar={setExpandSidebar}
      />
      <Outlet />
      <Users />
    </div>
  );
}

export default App;
