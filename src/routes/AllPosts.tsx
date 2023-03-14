import {
  ArrowDownward,
  ArrowUpward,
  Deblur,
  FeaturedPlayList,
  Whatshot,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseDb } from "../firebase";
import CustomButton from "../components/ui/CustomButton";
import Post from "../components/ui/Post";
import useGetActualUser from "../custom-hooks/useGetActualUser";
import { Button } from "@mui/material";

function AllPosts() {
  const [filter, setFilter] = useState("desc");
  const [allPosts, allPostsLoading, error] = useCollection(
    firebaseDb.collection("allPosts").orderBy("timestamp", filter as any) as any
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const { selfUserId } = useGetActualUser();

  function deletePost(docID: string) {
    firebaseDb
      .collection("allPosts")
      .doc(docID)
      .delete()
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    firebaseDb
      .collection("users")
      .doc(selfUserId)
      .collection("posts")
      .doc(docID)
      .delete()
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  return (
    <div className="overflow-overlay">
      <div
        className=" dark:zincbg  transition-700 sticky   top-0 z-10  flex h-12
      items-center  border-b-2  border-b-zinc-300 bg-[#ececee]   p-7 py-7   
      transition dark:border-zinc-700 "
      >
        <div className="relative flex w-full justify-between">
          <div className="flex items-center gap-2">
            <Whatshot className="!text-3xl" />
            <p>New posts!!!</p>
          </div>

          <CustomButton
            className="dark:!bg-zinc-900/80"
            onClick={() => setShowDropdown((prevDropdown) => !prevDropdown)}
          >
            Filter by:
          </CustomButton>

          {showDropdown ? (
            <div className=" absolute  top-14 right-0 rounded-lg bg-zinc-300 text-zinc-800 dark:bg-zinc-900 dark:text-white">
              <Button
                onClick={(e) => {
                  setShowDropdown(false);
                  setFilter("asc");
                }}
                className="flex  cursor-pointer select-none  items-center !p-3 
           !lowercase !text-zinc-800 dark:!text-white "
              >
                <ArrowDownward fontSize="small" />
                <p className="ml-1   text-sm">Oldest</p>
              </Button>

              <hr className="h-[0.1px] border-none bg-white dark:bg-zinc-700" />

              <Button
                onClick={(e) => {
                  setShowDropdown(false);
                  setFilter("desc");
                }}
                className="flex   cursor-pointer select-none items-center !p-3  !lowercase 
           !text-zinc-800 active:scale-95 dark:!text-white  "
              >
                <ArrowUpward fontSize="small"></ArrowUpward>
                <p className="ml-1  text-sm">Newest</p>
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <div className=" grid grid-flow-dense  justify-center gap-5 p-7 sm:grid-cols-2   xl:grid-cols-3 2xl:grid-cols-4 ">
        {allPosts?.docs.map((post) => (
          <Post
            profilePic={post.data().profilePic || ""}
            profileName={post.data().profileName || "no name"}
            allPostsPost={true}
            title={post.data().title}
            className={post.data().rowSpan}
            userId={post.data().userId}
            image={post.data().image}
            deletePost={() => deletePost(post.id)}
            bottomText={post.data().bottomText}
            paragraph={post.data().paragraph}
            key={post.id}
            date={new Date(post.data().timestamp?.seconds * 1000).toUTCString()}
          />
        ))}
      </div>
    </div>
  );
}

export default AllPosts;
