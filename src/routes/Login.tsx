import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeblurIcon from "@mui/icons-material/Deblur";
import { LoginOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { firebaseAuth, firebaseDb, firebaseProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

function Login() {
  const [userAccount, loading] = useAuthState(firebaseAuth as any);
  const navigate = useNavigate();

  //easy firebase login

  function login(e: { preventDefault: () => void }) {
    e.preventDefault();
    firebaseAuth
      .signInWithPopup(firebaseProvider)
      .then(({ user }) =>
        firebaseDb.collection("users").doc(user?.uid).set({
          name: user?.displayName,
          profilepic: user?.photoURL,
        })
      )

      .catch((error) => alert(error.message));
  }

  useEffect(() => {
    if (!loading) {
      !userAccount ? navigate("/login") : navigate("/");
    }
  }, [userAccount, loading]);

  return (
    <div className="relative flex  h-screen flex-col items-center justify-center  gap-4 bg-zinc-800 text-white ">
      <div className="custom__bg absolute top-0 left-0 h-screen w-1/4 border-r-2  border-r-zinc-700"></div>
      <DeblurIcon className="!text-[180px] sm:!text-[230px]" />
      <p className="pointer-events-none mb-2 select-none italic text-zinc-600">
        (i'll be seeing ur email address)
      </p>
      <Button
        onClick={login}
        variant="contained"
        className="w-3/4 !bg-zinc-900     !p-2 sm:w-64"
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
