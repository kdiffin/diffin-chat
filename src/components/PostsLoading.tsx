import { Skeleton } from "@mui/material";
import React from "react";
import Post from "./ui/Post";

function PostsLoading() {
  const skeletonArray = new Array(9).fill("");
  return (
    <>
      {skeletonArray.map((thing, index) => (
        <Skeleton key={index} className="   !-mt-20 !bg-zinc-700 ">
          <Post
            // yea these props dont matter im just not gonna turn them undefined just to fit this usecase
            // the title etc doesnt even show up im just doing this so it gets the right dimensions
            date="2"
            deletePost={() => ""}
            className=""
            title="PLACE HOLDER TEXT FOR IT TO LOOK OK OA A A A A A A A A A "
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.impericon.com%2F1560x480x90%2Fmedia%2Fimpericon%2Fheader%2Fmerchandise%2Ffirst_fragment%2F20210630_first_fragment_header.jpg&f=1&nofb=1&ipt=a4e5953968559f4d977ee5e805660bf9d1170286c6b7465310eaa01bffc1a250&ipo=images"
            bottomText="placehlersadas"
            paragraph="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat dolorem, nulla et nihil exercitationem mollitia magni aspernatur praesentium odit culpa eligendi cumque, unde odio velit officia in suscipit, laboriosam pariatur?"
          />
        </Skeleton>
      ))}
    </>
  );
}

export default PostsLoading;
