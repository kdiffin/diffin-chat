import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Users from "./components/Users";

function App() {
  const [showUsers, setShowUsers] = useState(true);

  return (
    <div className="App  h-screen  phoneBug:flex phoneBug:flex-col    bg-zinc-800  ">
      <div className=" phoneBug:flex h-[88%] phoneBug:h-auto phoneBug:flex-1">
        <Sidebar showUsers={showUsers} setShowUsers={setShowUsers} />
        <Chat />
      </div>
      <Users showUsers={showUsers} setShowUsers={setShowUsers} />
    </div>
  );
}

export default App;
