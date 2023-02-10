import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Users from "./components/Users";

function App() {
  return (
    <div className="App flex flex-col   bg-zinc-800  min-h-screen">
      <div className="flex  bg-zinc-800 flex-1">
        <Sidebar />
        <div className=" flex  flex-1  ">
          <Chat />{" "}
        </div>
      </div>

      <Users />
    </div>
  );
}

export default App;
