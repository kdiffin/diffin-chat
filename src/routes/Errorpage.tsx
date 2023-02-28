import { Deblur } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

function Errorpage(props: { chatError?: boolean }) {
  const error: any = useRouteError();
  const navigate = useNavigate();
  console.error(error);
  return (
    <div
      className={` ${props.chatError ? "h-full" : "h-screen"}
      } relative  flex flex-col items-center  justify-center gap-4 border-zinc-500 bg-zinc-800 text-white `}
    >
      {props.chatError ? (
        <> </>
      ) : (
        <>
          <div className="custom__bg absolute top-0 right-0 h-screen w-1/4 border-l-2  border-l-zinc-700"></div>
        </>
      )}

      <Deblur className="mb-2 !text-[180px]  sm:!text-[225px]" />
      <p className="text-center text-xl   font-semibold text-zinc-400  ">
        An error occured.
      </p>

      <p className="mb-2 text-lg italic text-zinc-500 ">
        {error.error?.message || error.statusText || "Unknown error"}
      </p>

      <Button
        onClick={() => navigate("/")}
        variant="contained"
        className="w-3/4 !bg-zinc-900/80    !p-2 sm:w-72"
      >
        Go Back Home
      </Button>
    </div>
  );
}

export default Errorpage;
