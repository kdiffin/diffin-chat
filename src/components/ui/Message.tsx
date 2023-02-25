import { DeleteOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { User } from "firebase/auth";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import React from "react";

function Message(props: {
  message: QueryDocumentSnapshot<DocumentData>;
  user: User | null | undefined;
  deleteMessage: (args: any) => void;
  messageBelowName?: boolean;
}) {
  return (
    <div className=" group flex items-center gap-3">
      <div
        className={`dark:bg-zinc-700/40   items-center flex  bg-zinc-200 h-auto
        ${
          props.messageBelowName ? "mt-3" : "ml-[55px]"
        } max-w-[1200px] break-all rounded-md p-4`}
      >
        <p>{props.message.data().message}</p>
      </div>
      {props.message.data().usersID === props.user?.uid && (
        <div
          onClick={() => props.deleteMessage(props.message.id)}
          className={`group-hover:opacity-100 active:scale-95 
          ${props.messageBelowName ? "mt-3" : ""} 
          opacity-0 transition-opacity`}
        >
          <IconButton>
            <DeleteOutline />
          </IconButton>{" "}
        </div>
      )}
    </div>
  );
}

export default Message;
