import { Avatar, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import { firebaseAuth, firebaseDb, firebase } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useLocation } from "react-router-dom";
import useSendGlobalMessage from "../custom-hooks/useSendGlobalMessage";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

function Chat() {
  const [messages, messagesLoading, loading, input, setInput, sendPost] =
    useSendGlobalMessage();

  const skeletonArray = new Array(20).fill(1);
  const loadingPlaceholder = skeletonArray.map((skeleton, index) => (
    <div className="flex mt-5" key={index}>
      <Skeleton
        variant="circular"
        width={45}
        height={45}
        className="mr-5 !bg-zinc-700 "
      />
      <div className="flex-col flex">
        <Skeleton
          variant="text"
          sx={{
            fontSize: "1.2rem",
            width: "100px",
            backgroundColor: "rgba(63 63 70 )",
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            width: "200px",
            height: "35px",
            marginTop: "12px",
            backgroundColor: "rgba(63 63 70 )",
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            width: "200px",
            height: "35px",
            marginTop: "12px",
            backgroundColor: "rgba(63 63 70 )",
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            width: "200px",
            height: "35px",
            marginTop: "12px",
            backgroundColor: "rgba(63 63 70 )",
          }}
        />
      </div>
    </div>
  ));

  const messageListJsx = messages?.docs.map(
    (message: QueryDocumentSnapshot<DocumentData>, index: number) => (
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
    )
  );

  return (
    <div className="chat__container  relative  dark:bg-zinc-800   overflow-overlay   col-span-1 ">
      <ChatHeader />
      {/* this is where the messages  go */}
      {/* weird 84% is so the input always stays at the bottom */}
      <div className="px-6 overflow min-h-[84%] p-1 dark:bg-zinc-800  ">
        {messagesLoading || loading ? loadingPlaceholder : messageListJsx}
      </div>
      <ChatFooter input={input} setInput={setInput} sendPost={sendPost} />
    </div>
  );
}

export default Chat;
