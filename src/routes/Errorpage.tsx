import { Deblur } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

function Errorpage(props: { chatError?: boolean }) {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <div
      className={` ${props.chatError ? "h-full" : "h-screen"}
      } relative  gap-4 flex-col items-center  border-zinc-500 flex justify-center text-white bg-zinc-800 `}
    >
      {props.chatError ? (
        <> </>
      ) : (
        <>
          <div className="absolute top-0 right-0 border-l-zinc-700 border-l-2 w-1/4 custom__bg  h-screen"></div>
        </>
      )}

      <Deblur className="sm:!text-[225px] !text-[180px]  mb-2" />
      <p className="text-zinc-400 text-center   text-xl font-semibold  ">
        An error occured.
      </p>

      <p className="text-zinc-500 italic mb-2 text-lg ">
        {error.error?.message || error.statusText || "Unknown error"}
      </p>

      <Button
        onClick={() => navigate("/")}
        variant="contained"
        className="sm:w-72 w-3/4    !bg-zinc-900/80 !p-2"
      >
        Go Back Home
      </Button>
    </div>
  );
}

export default Errorpage;
