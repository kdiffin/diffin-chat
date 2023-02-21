import {
  Avatar,
  Box,
  LinearProgress,
  Skeleton,
  Tab,
  Tabs,
  tabsClasses,
} from "@mui/material";
import { matchSorter } from "match-sorter";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Link, useNavigate } from "react-router-dom";
import useRouteMatch from "../custom-hooks/useRouteMatch";
import { firebaseDb } from "../firebase";

function Users(props: { search: any }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const [users, loading, error] = useCollection(
    firebaseDb.collection("users") as any
  );

  //copy pasted stuff from stacvkoverflow to make a unique array
  //yes i couldnt actually implement unique pushing to the database
  const uniqueList = users?.docs.filter(
    (listItem, index, self) =>
      index ===
      self.findIndex(
        (obj) => obj.data().profilepic === listItem.data().profilepic
      )
  );

  let allPaths: string[] = [];

  const finalList =
    //go console log uniquelist and read matchsorter docs ull get this code
    !loading && uniqueList
      ? matchSorter(uniqueList, props.search || "", {
          keys: ["_document.data.value.mapValue.fields.name.stringValue"],
        })
      : [];

  finalList?.map((item) =>
    allPaths.push(`users/${item?.data().name}/${item?.id}`)
  );

  //on default the array has %20 turns into a " "/space so i reversed that behviour
  //so that it truly matches the url
  allPaths = allPaths.map((path) => path.replace(" ", "%20"));

  const routeMatch = useRouteMatch(allPaths);
  const currentTab = routeMatch?.pattern?.path;
  const currentTabIndex = allPaths.indexOf(currentTab as string);
  console.log(currentTab);

  const skeletonArray = new Array(30).fill(1);
  const loadingPlaceholder = skeletonArray.map((skeleton, index) => (
    <Tab
      key={index}
      sx={{
        paddingLeft: "2px",
        paddingRight: "2px",
        minWidth: "70px",
      }}
      label={
        <Skeleton variant="circular">
          <Avatar
            sx={{
              width: 45,
              height: 45,

              backgroundColor: "rgba(63 63 70 )",
            }}
          />
        </Skeleton>
      }
    />
  ));

  const userList = finalList?.map((user) => (
    <Tab
      key={user?.id}
      sx={{
        paddingLeft: "2px",
        paddingRight: "2px",
        minWidth: "68px",
      }}
      className="group "
      label={
        //didnt make this a Link component because it has the weird link popup on the bottom left
        <div
          onClick={() => navigate(`users/${user?.data().name}/${user?.id}`)}
          className="relative"
        >
          <div
            className="opacity-0 transition-opacity duration-300 break-all ease-linear group-hover:opacity-100 flex 
          w-[45px] text-white overflow-hidden z-50 text-[9px] justify-center items-center  
            absolute flex-wrap h-[45px] bg-zinc-900/80 rounded-[30px] font-semibold   "
          >
            {user?.data().name}
          </div>
          <Avatar
            sx={{ width: 45, height: 45 }}
            src={user?.data().profilepic}
          />
        </div>
      }
    />
  ));

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="col-span-full w-screen h-15 items-center flex   border-t-zinc-300 border-t-2 dark:border-none dark:zincbg ">
      <Tabs
        variant="scrollable"
        scrollButtons
        className="!w-full"
        value={loading ? 0 : currentTabIndex}
        onChange={handleChange}
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
        }}
      >
        {loading ? loadingPlaceholder : userList}
        {userList?.length === 0 && !loading ? (
          <p className="italic  text-zinc-600 items-center flex h-[45px] animate-pulse">
            No users found...
          </p>
        ) : (
          <></>
        )}
      </Tabs>
    </div>
  );
}

export default Users;
