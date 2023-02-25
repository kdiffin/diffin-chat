import { User } from "firebase/auth";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import React, { RefObject, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseAuth, firebaseDb, firebase } from "../firebase";
import useHandleShortcut from "./useHandleShortcut";

function useSendGlobalMessage(props: {
  containerRefValue: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement>;
  collectionName: string;
}): {
  messages: QuerySnapshot<DocumentData> | undefined;
  messagesLoading: boolean;
  userLoading: boolean;
  sendPost: (e: { preventDefault: () => void }) => void;
  user: User | null | undefined;
} {
  // the chat itself so i can preform a function which scrolls to bottom when typed
  const chatHTML = props.containerRefValue.current;

  //ref of the thing we type in before sending the message
  const inputRef = props.inputRef.current;

  //user thats logged in rn
  const [user, userLoading] = useAuthState(firebaseAuth as any);

  const [messages, messagesLoading, error] = useCollection(
    firebaseDb
      .collection(props.collectionName)
      .orderBy("timestamp", "asc") as any
  );

  const latestMessage = messages?.docs[messages?.docs.length - 1];

  function scrollToBottom() {
    chatHTML!.scrollTop = chatHTML!.scrollHeight;
  }

  //what adds the message to the db
  function sendPost(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (userLoading && messagesLoading) {
      return;
    }

    const inputValue = inputRef?.value;

    if (inputValue === "") {
      return;
    }

    //ok to use ! for the types here i think because i already made it so that when its loading/messagesloading it returns

    if (inputValue!.length > 800) {
      alert("no sending crazy suepr long messages!");
      return;
    }

    const trimmedInput = inputValue?.trim();
    const inputList = trimmedInput!.split(" ");

    if (inputList[0] === "") {
      inputRef!.value = "";
      alert("dont do that bro");
      return;
    }

    firebaseDb
      .collection(props.collectionName)
      .add({
        message: inputValue,
        name: user?.displayName,
        usersID: user?.uid,
        profilePic: user?.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => scrollToBottom());
    inputRef!.value = "";
  }

  useEffect(() => {
    !userLoading && !messagesLoading ? scrollToBottom() : "";
  }, [messagesLoading]);

  return { messages, messagesLoading, userLoading, sendPost, user };
}

export default useSendGlobalMessage;
