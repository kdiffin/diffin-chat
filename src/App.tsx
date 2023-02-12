import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Users from "./components/Users";

function App() {
  return (
    <div className=" bg-zinc-800  w-screen app  h- h-screen ">
      <Sidebar />
      <Chat />
      <Users />
    </div>
  );
}

export default App;
