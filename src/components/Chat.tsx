import { Avatar, Skeleton } from "@mui/material";
import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import { firebaseAuth, firebaseDb, firebase } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

function Chat() {
  const [input, setInput] = useState("");
  const [user, loading] = useAuthState(firebaseAuth as any);

  const [messages, messagesLoading, error] = useCollection(
    firebaseDb.collection("globalMessages").orderBy("timestamp", "desc") as any
  );

  function sendPost(e: { preventDefault: () => void }) {
    e.preventDefault();
    firebaseDb.collection("globalMessages").add({
      message: input,
      name: user?.displayName,
      profilePic: user?.photoURL,

      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  }

  const skeletonArray = new Array(30).fill(1);

  //wip not finished

  const loadingPlaceholder = skeletonArray.map((skeleton, index) => (
    <Skeleton key={index}>
      <Avatar className="!w-10 !h-10 mr-4" />
      <div className="mt-4  flex ">
        <div className="flex-col flex"></div>
      </div>{" "}
    </Skeleton>
  ));

  const messageListJsx =
    !messagesLoading &&
    messages?.docs.map((message, index, self) => (
      <div className="mt-4  flex  " key={message.id}>
        {message.data().profilePic ===
        messages?.docs[index - 1]?.data().profilePic ? (
          <></>
        ) : (
          <Avatar
            src={message.data().profilePic}
            className="!w-10 !h-10  mr-4 col-span-full"
          />
        )}

        <div className="flex-col flex">
          {message.data().name === messages?.docs[index - 1]?.data().name ? (
            <div className="dark:bg-zinc-700/40 bg-zinc-200 w-  h-auto ml-[55px]  rounded-md p-4">
              <p>{message.data().message}</p>
            </div>
          ) : (
            <>
              <p>{message.data().name} </p>
              <div className="dark:bg-zinc-700/40 bg-zinc-200 mt-3 max-w-[1200px] break-all mr-1  rounded-md p-4">
                <p>{message.data().message}</p>
              </div>
            </>
          )}
        </div>
      </div>
    ));

  return (
    <div className="chat__container  relative  dark:bg-zinc-800   overflow-overlay   col-span-1 ">
      <ChatHeader />
      {/* this is where the messages  go */}
      {/* weird 84% is so the input always stays at the bottom */}
      <div className="px-6 overflow min-h-[84%] p-1 dark:bg-zinc-800  ">
        {loading ? loadingPlaceholder : messageListJsx}
      </div>
      <ChatFooter input={input} setInput={setInput} sendPost={sendPost} />
    </div>
  );
}

export default Chat;
