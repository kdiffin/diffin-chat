import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeblurIcon from "@mui/icons-material/Deblur";
import { LoginOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { firebaseAuth, firebaseProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const navigate = useNavigate();

  //easy firebase login

  function login(e: { preventDefault: () => void }) {
    e.preventDefault();
    firebaseAuth
      .signInWithPopup(firebaseProvider)
      .catch((error) => alert(error.message));
    navigate("/");
  }

  return (
    <div className="h-screen relative  gap-4 flex-col items-center flex  justify-center text-white bg-zinc-800 ">
      {" "}
      <div className="absolute top-0 left-0 border-r-zinc-700 border-r-2 w-1/4 custom__bg  h-screen"></div>
      <DeblurIcon className="sm:!text-[230px] !text-[180px]" />
      <p className="text-zinc-600 italic mb-2 pointer-events-none select-none">
        {" "}
        (i'll be seeing ur email address)
      </p>
      <Button
        onClick={login}
        variant="contained"
        className="sm:w-64 w-3/4     !bg-zinc-900 !p-2"
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
