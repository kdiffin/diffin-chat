import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useLocation } from "react-router-dom";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
import { firebaseDb } from "../firebase";

function UserChat() {
  //a lot of code here will be repeated from chat.tsx but oh well :b
  const [input, setInput] = useState<string>("");
  const [users, usersLoading] = useCollection(
    firebaseDb.collection("users") as any
  );
  const [userId, setUserId] = useState<string>();
  const location = useLocation();

  useEffect(() => {
    //this makes an array where the last item is the id of the user
    const splittedLocation: string[] = location.pathname.split("/");
    setUserId(splittedLocation[splittedLocation.length - 1]);
  }, [location]);

  console.log(userId);

  function sendPost(e: { preventDefault: () => void }) {
    e.preventDefault();

    setInput("");
  }

  return (
    <div className="chat__container  relative  dark:bg-zinc-800   overflow-overlay   col-span-1 ">
      <ChatHeader />
      {/* weird 84% is so the input always stays at the bottom */}
      <div className="px-6 overflow min-h-[84%] p-1 dark:bg-zinc-800  "></div>
      <ChatFooter input={input} setInput={setInput} sendPost={sendPost} />
    </div>
  );
}

export default UserChat;
