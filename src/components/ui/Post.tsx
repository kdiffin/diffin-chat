import React, { memo } from "react";
import useGetActualUser from "../../custom-hooks/useGetActualUser";
import { Avatar, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const Post = memo(function Post(props: {
  title: string | undefined;
  paragraph?: string;
  image?: string;
  className?: string;
  profilePic?: string;
  profileName?: string;
  deletePost: VoidFunction | undefined;
  allPostsPost?: boolean;
  bottomText?: string;
  userId?: string;
  date: string;
}) {
  const { selfUserId } = useGetActualUser();
  return (
    <div
      className={
        props.className +
        " dark:zincbg group mt-4 flex flex-col break-all rounded-md bg-zinc-200 p-4 "
      }
    >
      <div className="flex w-full items-center justify-between">
        <p className="w-[80%] text-lg font-semibold text-zinc-800 dark:text-zinc-200">
          {props.title || "No title yet..."}
        </p>

        {props.userId === selfUserId ? (
          <IconButton
            onClick={props.deletePost}
            className="flex !h-7 !w-7 !p-1 opacity-0 !transition !duration-300 group-hover:opacity-100"
          >
            <Delete className="!h-full !w-full " />
          </IconButton>
        ) : (
          <></>
        )}
      </div>

      {props.paragraph ? (
        <p className="text-md my-2  max-h-[190px] overflow-hidden   italic text-zinc-500 ">
          {props.paragraph}
        </p>
      ) : null}

      {!(props.image === "") ? (
        <div className="flex h-[250px] w-full items-center justify-center">
          <img src={props.image} className="   h-full w-full object-cover  " />
        </div>
      ) : null}

      {props.bottomText ? (
        <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-300">
          {props.bottomText}{" "}
        </p>
      ) : null}

      <div
        className={`flex items-center ${
          props.allPostsPost ? "mt-3" : ""
        }  justify-between`}
      >
        {props.allPostsPost ? (
          <div className="flex items-center  py-1">
            <Avatar
              src={props.profilePic}
              className="col-span-full mr-2  !h-8 !w-8  lowercase"
            >
              {props.profileName![0] + props.profileName![1]}
            </Avatar>

            <p className="text-sm"> {props.profileName}</p>
          </div>
        ) : null}
        <p className="py-2 text-xs italic text-zinc-500">{props.date}</p>
      </div>
    </div>
  );
});

export default Post;
