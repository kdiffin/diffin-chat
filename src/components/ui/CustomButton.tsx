import { Button } from "@mui/material";
import React from "react";

function CustomButton(props: {
  type?: "button" | "submit" | "reset" | undefined;
  children: string;
  className?: string;
  onClick?: VoidFunction;
}) {
  return (
    <Button
      variant="contained"
      onClick={props.onClick}
      type={props.type}
      className={`${props.className} !bg-zinc-300 !text-zinc-800 !shadow-none  dark:!bg-zinc-700 dark:!text-white`}
    >
      {props.children}
    </Button>
  );
}

export default CustomButton;
