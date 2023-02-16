import {
  Avatar,
  Box,
  LinearProgress,
  Skeleton,
  Tab,
  Tabs,
  tabsClasses,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseDb } from "../firebase";

function Users() {
  const [value, setValue] = useState(0);
  const [users, loading, error] = useCollection(
    firebaseDb.collection("users") as any
  );

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
          <Avatar sx={{ width: 45, height: 45 }} />
        </Skeleton>
      }
    />
  ));

  //i DONT know what this function does. i'll look into it later. Im tired.

  const uniqueList = users?.docs.filter(
    (schema, index, self) =>
      index ===
      self.findIndex(
        (obj) => obj.data().profilepic === schema.data().profilepic
      )
  );

  const userList = uniqueList?.map((user) => (
    <Tab
      key={user?.id}
      sx={{
        paddingLeft: "2px",
        paddingRight: "2px",
        minWidth: "68px",
      }}
      className="group"
      label={
        <Avatar sx={{ width: 45, height: 45 }} src={user?.data().profilepic} />
      }
    />
  ));

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="col-span-full w-screen  border-t-zinc-300 border-t-2 dark:border-none dark:bg-zinc-900/40 ">
      <Tabs
        variant="scrollable"
        scrollButtons
        value={value}
        onChange={handleChange}
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
        }}
      >
        {loading ? loadingPlaceholder : userList}
      </Tabs>
    </div>
  );
}

export default Users;
