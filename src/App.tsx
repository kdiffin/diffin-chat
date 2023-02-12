import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Users from "./components/Users";

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false);

  return (
    <div
      className={` bg-zinc-800  w-screen app transition duration-500
      ${expandSidebar ? "openSidebar" : " closedSidebar"}  h-screen `}
    >
      <Sidebar
        expandSidebar={expandSidebar}
        setExpandSidebar={setExpandSidebar}
      />
      <Chat />
      <Users />
    </div>
  );
}

export default App;
