import { DocumentData, QuerySnapshot } from "firebase/firestore";
import React, { RefObject, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseAuth, firebaseDb, firebase } from "../firebase";

function useSendGlobalMessage(props: {
  containerRefValue: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement>;
  collectionName: string;
}): {
  messages: QuerySnapshot<DocumentData> | undefined;
  messagesLoading: boolean;
  loading: boolean;
  sendPost: (e: { preventDefault: () => void }) => void;
} {
  // the chat itself so i can preform a function which scrolls to bottom when typed
  const chatHTML = props.containerRefValue.current;

  //ref of the thing we type in before sending the message
  const inputRef = props.inputRef.current;

  //user thats logged in rn
  const [user, loading] = useAuthState(firebaseAuth as any);

  const [messages, messagesLoading, error] = useCollection(
    firebaseDb
      .collection(props.collectionName)
      .orderBy("timestamp", "asc") as any
  );

  //what adds the message to the db
  function sendPost(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (loading && messagesLoading) {
      return;
    }

    const inputValue = inputRef?.value;

    if (inputValue === "") {
      return;
    }

    //ok to use ! for the types here i think because i already made it so that when its loading/messagesloading it returns
    const trimmedInput = inputValue?.trim();
    const inputList = trimmedInput!.split(" ");

    console.log(inputList);
    if (inputList[0] === "") {
      inputRef!.value = "";
      alert("dont do that bro");
      return;
    }

    firebaseDb.collection(props.collectionName).add({
      message: inputValue,
      name: user?.displayName,
      profilePic: user?.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    inputRef!.value = "";
  }

  //the reason i made this a useEffect is cuz itll lag behind when doing it in the sendPost
  useEffect(() => {
    !loading && !messagesLoading
      ? (chatHTML!.scrollTop = chatHTML!.scrollHeight)
      : "";
  }, [messages]);

  return { messages, messagesLoading, loading, sendPost };
}

export default useSendGlobalMessage;
