import { v4 } from "uuid";
import { User } from "firebase/auth";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { RefObject, SetStateAction, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  firebaseAuth,
  firebaseDb,
  firebase,
  firebaseApp,
  firebaseStorage,
} from "../firebase";

function useSendGlobalMessage(props: {
  containerRefValue: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement>;
  collectionName: string;
  fileInputRef: RefObject<HTMLInputElement>;
  urlImageInputRef: RefObject<HTMLInputElement>;
}): {
  messages: QuerySnapshot<DocumentData> | undefined;
  messagesLoading: boolean;
  userLoading: boolean;
  sendPost: (e: { preventDefault: () => void }) => void;
  user: User | null | undefined;
  clearValueOfRef(ref: HTMLInputElement | null): void;
  onFileChange(e: { target: { files: any[] } }): void;
  setImageUpload: React.Dispatch<React.SetStateAction<null | File>>;
  imageUpload: null | File;
} {
  //ngl at this point i shouldve used react hook form for this but i was too deep in so i went with my own validation anyway

  //the state of the image file that gets previewed in chatfooter
  const [imageUpload, setImageUpload] = useState<null | File>(null);
  // the chat itself so i can preform a function which scrolls to bottom when typed
  const chatHTML = props.containerRefValue.current;

  //ref of the thing we type in before sending the message
  const inputRef = props.inputRef.current;

  //the ref of the img file upload
  const fileInputRef = props.fileInputRef.current;

  //the ref of the image link input
  const urlImageInputRef = props.urlImageInputRef.current;

  //user thats logged in rn
  const [user, userLoading] = useAuthState(firebaseAuth as any);
  const [messages, messagesLoading, error] = useCollection(
    firebaseDb
      .collection(props.collectionName)
      .orderBy("timestamp", "asc") as any
  );
  const latestMessage = messages?.docs[messages?.docs.length - 1];

  //helper functions
  function scrollToBottom() {
    chatHTML!.scrollTop = chatHTML!.scrollHeight;
  }

  function clearValueOfRef(ref: HTMLInputElement | null) {
    if (ref === null || ref === undefined) {
      return;
    }

    ref.value = "";
  }

  function onFileChange(e: {
    target: { files: SetStateAction<null | File>[] };
  }) {
    setImageUpload(e.target.files[0]);
  }

  //what adds the message to the db
  function sendPost(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (userLoading || messagesLoading) {
      return;
    }

    const inputValue = inputRef?.value;
    const imageURLValue = urlImageInputRef?.value;
    const fileInputValue = fileInputRef?.value;

    if (inputValue === "" && !imageURLValue) {
      return;
    }

    if (imageURLValue) {
      const urlRegex =
        "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$";
      const url = new RegExp(urlRegex, "i");

      if (!url.test(imageURLValue)) {
        urlImageInputRef!.value = "";
        alert("no sending non urls");
        return;
      }
    }

    //ok to use ! for the types here i think because i already made it so that when its loading/messagesloading it returns
    if (
      inputValue!.length > 800 ||
      (imageURLValue ? imageURLValue.length > 600 : inputValue!.length > 800)
    ) {
      inputRef!.value = "";
      alert("no sending crazy suepr long messages!");

      return;
    }

    const trimmedInput = inputValue?.trim();
    const inputList = trimmedInput!.split(" ");

    if (inputList[0] === "" && !imageURLValue) {
      inputRef!.value = "";
      alert("dont do that bro");
      return;
    }

    // the way this function works is that when you send a message with a file in it,
    // it then sends that file to the cloud storage in firebase which then,
    // parses it and turns it into a url which an <img> tag can read, and then
    // it sends that url to my database.
    if (fileInputValue) {
      if (imageUpload == null) {
        fileInputRef!.value = "";
        alert("dont send with no image");
        return;
      }

      const imageName = `images/${imageUpload.name + v4()}`;

      const imageRef = ref(firebaseStorage, imageName);

      let imageUrl = "";

      uploadBytes(imageRef, imageUpload)
        .then(() =>
          getDownloadURL(ref(firebaseStorage, imageName)).then((url) => {
            imageUrl = url;
          })
        )
        .then(() =>
          firebaseDb
            .collection(props.collectionName)
            .add({
              message: inputValue,
              name: user?.displayName,
              messageImg: imageUrl,
              usersID: user?.uid,
              profilePic: user?.photoURL,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => scrollToBottom())
        );
      clearValueOfRef(inputRef);
      clearValueOfRef(urlImageInputRef);
      clearValueOfRef(fileInputRef);
      setImageUpload(null);

      return;
    }

    firebaseDb
      .collection(props.collectionName)
      .add({
        message: inputValue,
        name: user?.displayName,
        messageImg: imageURLValue || "",
        usersID: user?.uid,
        profilePic: user?.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => scrollToBottom());

    clearValueOfRef(inputRef);
    clearValueOfRef(urlImageInputRef);
    clearValueOfRef(fileInputRef);
  }

  useEffect(() => {
    !userLoading && !messagesLoading ? scrollToBottom() : "";
  }, [messages]);

  useEffect(() => {
    !userLoading && !messagesLoading ? scrollToBottom() : "";
  }, [messagesLoading]);

  return {
    messages,
    messagesLoading,
    userLoading,
    sendPost,
    user,
    clearValueOfRef,
    onFileChange,
    imageUpload,
    setImageUpload,
  };
}

export default useSendGlobalMessage;
