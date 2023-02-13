import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Users from "./components/Users";
import UseDarkMode from "./custom-hooks/UseDarkMode";

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [darkMode, setDarkMode] = UseDarkMode();

  return (
    <div
      className={` dark:bg-zinc-800 dark:text-white  bg-zinc-200/50 text-zinc-700  app  transition duration-300
      ${expandSidebar ? "openSidebar" : " closedSidebar"}  h-screen `}
    >
      <Sidebar
        expandSidebar={expandSidebar}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
        setExpandSidebar={setExpandSidebar}
      />
      <Chat />
      <Users />
    </div>
  );
}

export default App;
