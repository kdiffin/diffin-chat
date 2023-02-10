import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Users from "./components/Users";

function App() {
  return (
    <div className="App  h-screen  phoneBug:flex phoneBug:flex-col   bg-zinc-800  ">
      <div className=" phoneBug:flex phoneBug:flex-1">
        <Sidebar />
        <Chat />
      </div>
      <Users />
    </div>
  );
}

export default App;
