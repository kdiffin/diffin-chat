import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";
import UseDarkMode from "../custom-hooks/UseDarkMode";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase";

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [darkMode, setDarkMode] = UseDarkMode();
  const [user, loading] = useAuthState(firebaseAuth as any);
  const navigate = useNavigate();

  //todo: find out how to parse the location string to only get last part
  //then push to db doc by id

  useEffect(() => {
    if (!loading) {
      !user && navigate("/login");
    }
  }, [user, loading]);

  return (
    <div
      className={` dark:bg-zinc-800 dark:text-white  bg-zinc-200/50 text-zinc-700
       [&>*]:transition [&>*]:duration-500  app  transition duration-500
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
