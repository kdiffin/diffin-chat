import {
  Article,
  Star,
  StarBorderOutlined,
  Warning,
} from "@mui/icons-material";
import { Avatar, Button, IconButton, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { Link, useLocation } from "react-router-dom";
import useDetectSticky from "../custom-hooks/useDetectSticky";
import useGetActualUser from "../custom-hooks/useGetActualUser";
import { firebaseDb } from "../firebase";
import Post from "../components/ui/Post";
import CustomButton from "../components/ui/CustomButton";
import { Timestamp } from "firebase/firestore";

function Profile() {
  const [userId, setUserId] = useState<string>();
  const location = useLocation();
  const [isSticky, ref, setIsSticky] = useDetectSticky();
  const { selfUserInfo } = useGetActualUser();
  const [userInfo, userInfoloading, userInfoError] = useDocument(
    firebaseDb.collection("users").doc(userId) as any
  );
  const [userPosts, userPostsLoading, userPostsError] = useCollection(
    firebaseDb
      .collection("users")
      .doc(userId)
      .collection("posts")
      .orderBy("timestamp", "desc") as any
  );
  const userData = userInfo?.data();
  const isSelf = !userInfoloading && userId === selfUserInfo?.id;

  useEffect(() => {
    //this makes an array where the last item is the id of the user
    //ill later use that userid to push into that specific user doc
    const splittedLocation: string[] = location.pathname.split("/");
    setUserId(splittedLocation[splittedLocation.length - 1]);
  }, [location]);

  function deletePost(docID: string) {
    //same logic as allPosts
    console.log(docID);
    firebaseDb
      .collection("allPosts")
      .doc(docID)
      .delete()
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    firebaseDb
      .collection("users")
      .doc(userId)
      .collection("posts")
      .doc(docID)
      .delete()
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  return (
    <div className="  overflow-overlay    relative col-span-1   dark:bg-zinc-800 ">
      {userData?.banner ? (
        <div className="flex items-center">
          <img
            src={userData?.banner}
            className="h-1/3 max-h-[190px]  w-full object-cover lg:max-h-[220px] "
            alt=""
          />
        </div>
      ) : (
        <></>
      )}

      <div
        ref={ref}
        //-top-1 is needed cuz usedetectsticky is weird
        className={`sticky -top-1 z-10 flex items-center justify-between bg-zinc-200   dark:bg-[#242427] ${
          isSticky
            ? "border-b-2  border-b-zinc-700 p-4 shadow-sm dark:shadow-zinc-700/70"
            : " p-5 lg:p-8 lg:px-14"
        } `}
      >
        <div className=" flex items-center">
          {/* add a popup to when they click the avatar */}
          {userInfoloading ? (
            <Skeleton
              variant="circular"
              className="!h-20 !w-20 !bg-zinc-200 dark:!bg-zinc-800 sm:!h-24 sm:!w-24 "
            />
          ) : (
            <Avatar
              src={userData?.profilepic}
              className={` ${
                isSticky ? "!h-12 !w-12" : "!h-20 !w-20 sm:!h-24 sm:!w-24"
              }  !text-2xl transition-all duration-500`}
            >
              {" "}
              {userData?.name[0] + userData?.name[1]}
            </Avatar>
          )}

          <div
            className={` 
          ${isSticky ? "ml-2 flex items-center gap-3" : "ml-4"} 
  `}
          >
            <p className=" text-3xl">
              {userInfoloading ? (
                <span className="mt-2 animate-pulse text-xl italic text-zinc-500">
                  loading...
                </span>
              ) : (
                userData?.name
              )}
            </p>
            <p className="flex items-center italic text-zinc-500">
              {" "}
              <Star fontSize="small" />
              's: xx
            </p>
            <p
              className={` ${
                !isSticky && "-mt-1"
              } flex items-center italic text-zinc-500`}
            >
              <Article fontSize="small" />
              's: xx
            </p>
          </div>
        </div>

        {isSelf ? (
          <Link to="/me">
            <CustomButton>Edit Profile</CustomButton>
          </Link>
        ) : (
          <div className={isSticky ? `flex items-center [&_p]:hidden` : ""}>
            <div className=" flex items-center   text-zinc-500">
              <p className="hidden md:flex"> Star this user:</p>{" "}
              <span className="text-zinc-400">
                <IconButton>
                  <StarBorderOutlined />
                </IconButton>
              </span>
            </div>

            <div
              className={` ${
                !isSticky && "-mt-2"
              } flex items-center text-zinc-500`}
            >
              <p className="hidden md:flex">Report this user:</p>{" "}
              <span className="text-zinc-400">
                <IconButton>
                  <Warning />
                </IconButton>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* //come up w different row spans for each of these variations  and turn that into a value
       which u can then pass over to when the posts get mapped over*/}
      <div className="grid grid-flow-dense  items-center justify-center gap-5 p-5 sm:grid-cols-2   xl:grid-cols-3 2xl:grid-cols-4 ">
        {/* all user posts here */}
        {userPosts?.docs.map((post) => (
          <Post
            title={post.data().title}
            className={post.data().rowSpan}
            image={post.data().image}
            userId={post.data().userId}
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

export default Profile;

// if i ever feel like adding skeleton to the posts again ill use this i guess

// function PostsLoadingSkeleton() {
//   const skeletonArray = new Array(4).fill(1);
//   return (
//     <>
//       {skeletonArray.map((thing) => (
//         <Skeleton className=" col-span-1 !bg-zinc-700 pb-20">
//           <Post
//             className=""
//             title="PLACE HOLDER TEXT FOR IT TO LOOK OK OA A A A A A A A A A "
//             image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.impericon.com%2F1560x480x90%2Fmedia%2Fimpericon%2Fheader%2Fmerchandise%2Ffirst_fragment%2F20210630_first_fragment_header.jpg&f=1&nofb=1&ipt=a4e5953968559f4d977ee5e805660bf9d1170286c6b7465310eaa01bffc1a250&ipo=images"
//             bottomText="placehlersadas"
//             paragraph="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat dolorem, nulla et nihil exercitationem mollitia magni aspernatur praesentium odit culpa eligendi cumque, unde odio velit officia in suscipit, laboriosam pariatur?"
//           />
//         </Skeleton>
//       ))}
//     </>
//   );
// }
