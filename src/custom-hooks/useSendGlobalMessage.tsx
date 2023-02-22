import { DocumentData, QuerySnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseAuth, firebaseDb, firebase } from "../firebase";

function useSendGlobalMessage(props: {
  refValue: { current: null | HTMLDivElement };
  collectionName: string;
}): {
  messages: QuerySnapshot<DocumentData> | undefined;
  messagesLoading: boolean;
  loading: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sendPost: (e: { preventDefault: () => void }) => void;
} {
  // the chat itself so i can preform a function which scrolls to bottom when typed
  const chatHTML = props.refValue.current;

  //value of the thing we type in before sending the message
  const [input, setInput] = useState<string>("");

  //user thats logged in rn
  const [user, loading] = useAuthState(firebaseAuth as any);

  //u can name this to anything else other than messages
  const [messages, messagesLoading, error] = useCollection(
    firebaseDb
      .collection(props.collectionName)
      .orderBy("timestamp", "asc") as any
  );

  //what adds the message to the db
  function sendPost(e: { preventDefault: () => void }) {
    //okay i know this is HELLA goofy but i cant be bothered to learn how to trim useless whitespace right now
    e.preventDefault();

    if (input > " " || "  " || "   " || "    ") {
      alert("dont do that bro");
      return;
    }

    firebaseDb.collection(props.collectionName).add({
      message: input,
      name: user?.displayName,
      profilePic: user?.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  }

  //the reason i made this a useEffect is cuz itll lag behind when doing it in the sendPost
  useEffect(() => {
    !loading && !messagesLoading
      ? (chatHTML!.scrollTop = chatHTML!.scrollHeight)
      : "";
  }, [messages]);

  return { messages, messagesLoading, loading, input, setInput, sendPost };
}

export default useSendGlobalMessage;
