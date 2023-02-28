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
  showImage: boolean;
}) {
  return (
    <div className=" group flex  items-center gap-3">
      <div
        className={`flex h-auto flex-col items-center  break-all rounded-md bg-zinc-200 p-4 dark:bg-zinc-700/40
        ${props.messageBelowName ? "mt-3" : "ml-[55px]"} 
        ${props.showImage ? `max-w-[350px] ` : "max-w-[1000px]"} `}
      >
        <p className="text-left">{props.message.data().message}</p>
        {props.showImage ? (
          <img src={props.message.data().messageImg} alt="" className="mt-2" />
        ) : (
          <p></p>
        )}
      </div>

      {props.message.data().usersID === props.user?.uid && (
        <div
          onClick={() => props.deleteMessage(props.message.id)}
          className={`active:scale-95 group-hover:opacity-100 
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
