import { Language, Translate } from "@mui/icons-material";
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

  let allPaths: string[] = ["/"];

  const finalList =
    //go console log uniquelist and read matchsorter docs ull get this code
    !loading
      ? matchSorter(users?.docs!, props.search || "", {
          keys: ["_document.data.value.mapValue.fields.name.stringValue"],
        })
      : [];

  //creates an array of all the routes so that the navigation can work
  finalList?.map((item) =>
    allPaths.push(`profiles/${item?.data().name}/${item?.id}`)
  );

  //on default the array has %20 turns into a " "/space so i reversed that behviour
  //so that it truly matches the url
  allPaths = allPaths.map((path) => path.replace(" ", "%20"));

  const routeMatch = useRouteMatch(allPaths);
  const currentTab = routeMatch?.pattern?.path;
  const currentTabIndex = allPaths.indexOf(currentTab as string);

  const skeletonArray = new Array(20).fill(1);
  const loadingPlaceholder = skeletonArray.map((skeleton, index) => (
    <Tab
      key={index}
      sx={{
        paddingLeft: "2px",
        paddingRight: "2px",
        minWidth: "70px",
      }}
      label={
        <Skeleton variant="circular" className="dark:!bg-zinc-700">
          <Avatar
            sx={{
              width: 45,
              height: 45,
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
          onClick={() => navigate(`profiles/${user?.data().name}/${user?.id}`)}
          className="relative"
        >
          <div
            className="absolute z-50 flex h-[45px] w-[45px] flex-wrap items-center 
          justify-center overflow-hidden break-all rounded-[30px] bg-zinc-900/80 text-[9px] font-semibold  
            text-white opacity-0 transition-opacity duration-300 ease-linear group-hover:opacity-100   "
          >
            {user?.data().name}
          </div>
          <Avatar
            sx={{ width: 45, height: 45 }}
            src={user?.data().profilepic}
            className=" lowercase"
          >
            {user?.data().name[0] + user?.data().name[1]}
          </Avatar>
        </div>
      }
    />
  ));

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div
      className="h-15 dark:zincbg col-span-full flex w-screen  
      
    items-center border-t-2 border-t-zinc-300 dark:border-none
      "
    >
      <Tabs
        variant="scrollable"
        scrollButtons
        className="!w-full"
        //+1 on currenttabindex cuz theres a globe at the 0 index
        value={loading ? value : currentTabIndex}
        onChange={handleChange}
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
        }}
      >
        {userList?.length === 0 ? (
          []
        ) : (
          <Tab
            label={
              <Avatar
                onClick={() => navigate("/")}
                sx={{ width: 45, height: 45, backgroundColor: "transparent" }}
                className="border-[1px] border-zinc-300 !text-zinc-600 dark:border-zinc-700 dark:!text-white"
              >
                <Language />
              </Avatar>
            }
          ></Tab>
        )}

        {loading ? loadingPlaceholder : userList}
      </Tabs>
      {userList?.length === 0 && !loading ? (
        <p className="absolute left-10 ml-2  animate-pulse text-lg italic  text-zinc-600">
          No users found...
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Users;
