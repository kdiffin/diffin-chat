import { Info, Search } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import {
  Form,
  useLocation,
  useNavigation,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { selectSearchbar } from "../redux/searchbarSlice";
import Input from "./ui/Input";
import { current } from "@reduxjs/toolkit";

function SearchUser() {
  //we get the callback for this from main.tsx app routes id
  //this is the app components loader data
  const search: any = useRouteLoaderData("app");
  const submit = useSubmit();
  const location = useLocation();
  const showSearchbar = useSelector(selectSearchbar);

  return (
    <div className="">
      <Form
        className={`${showSearchbar ? " openSearchbar " : " closeSearchbar  "} 
        chatInput__background hover-info-container    absolute top-6 left-1/2 z-50 
        flex w-full -translate-x-1/2  items-center  rounded-md
        bg-zinc-300 px-5 dark:bg-zinc-700 dark:shadow-md dark:shadow-zinc-800 `}
        id="search-form"
        action={`${location.pathname || ""}?search=${search}`}
        role="search"
        //automatically submits the form when typing and removes useless history
      >
        <Search fontSize="small" className="text-zinc-400"></Search>
        <Input
          placeholder={"find user"}
          type={"text"}
          customFunction={true}
          value={undefined}
          id="search"
          defaultValue={search}
          name="search"
          onChange={(e: any) => {
            console.log(e.currentTarget.form);
            submit(e.currentTarget.form);
          }}
        ></Input>
        <Info className="hover-info  cursor-help  !text-[20px] italic text-zinc-400 dark:text-zinc-500" />
        <div
          className="info-tooltip dark:zincbg pointer-events-none absolute top-12 right-0  z-10 mt-2 min-w-max cursor-none select-none items-center 
        rounded-md bg-zinc-200 p-2 px-3 text-sm italic text-zinc-800 opacity-0 transition-all duration-300 dark:text-zinc-300  "
        >
          to automatically use the searchbar, use ctrl+"
        </div>{" "}
      </Form>
    </div>
  );
}

export default SearchUser;
