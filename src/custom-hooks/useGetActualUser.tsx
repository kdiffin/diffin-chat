import { Skeleton } from "@mui/material";
import { User } from "firebase/auth";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import React, { Component } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { firebaseAuth, firebaseDb } from "../firebase";

function useGetActualUser(): {
  selfUserData: DocumentData | undefined;
  selfUserInfo: DocumentSnapshot<DocumentData> | undefined;
  selfUserInfoRef: any;
  selfUserInfoLoading: boolean;
  banner: string | undefined;
  profilePic: string | undefined;
  selfUserId: string | undefined;
  profileName: string | undefined;
  AvatarSkeleton(props: { className: string }): JSX.Element;
} {
  //this function checks if the id in the users collection matches with the id in auth (urself)
  const [selfUser, selfUserLoading, error] = useAuthState(firebaseAuth as any);
  const selfUserInfoRef = firebaseDb.collection("users").doc(selfUser?.uid);
  const [selfUserInfo, selfUserInfoLoading, userInfoError] = useDocument(
    selfUserInfoRef as any
  );

  const selfUserData = selfUserInfo?.data();
  const selfUserId = selfUser?.uid;
  const banner: string | undefined = selfUserInfo?.data()?.banner;
  const profilePic: string | undefined = selfUserInfo?.data()?.profilepic;
  const profileName: string | undefined = selfUserInfo?.data()?.name;

  function AvatarSkeleton(props: { className?: string }) {
    return (
      <Skeleton
        variant="circular"
        className={props.className + " animate-pulse"}
      />
    );
  }

  return {
    selfUserInfoRef,
    selfUserInfo,
    selfUserInfoLoading,
    selfUserData,
    selfUserId,
    banner,
    profilePic,
    profileName,
    AvatarSkeleton,
  };
}

export default useGetActualUser;
