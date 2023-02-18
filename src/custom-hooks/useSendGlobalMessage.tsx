import { DocumentData, QuerySnapshot } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseAuth, firebaseDb, firebase } from "../firebase";

function useSendGlobalMessage(): [
  QuerySnapshot<DocumentData> | undefined,
  boolean,
  boolean,
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (e: { preventDefault: () => void }) => void
] {
  //value of the thing we type in before sending the message
  const [input, setInput] = useState<string>("");
  //user thats logged in rn
  const [user, loading] = useAuthState(firebaseAuth as any);
  //u can name this to anything else other than messages
  const [messages, messagesLoading, error] = useCollection(
    firebaseDb.collection("globalMessages").orderBy("timestamp", "desc") as any
  );

  //what adds the message to the db
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

  return [messages, messagesLoading, loading, input, setInput, sendPost];
}

export default useSendGlobalMessage;
