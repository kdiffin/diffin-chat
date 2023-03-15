import { Article, Camera, CameraAlt, Photo, Star } from "@mui/icons-material";
import { Avatar, Button, Divider } from "@mui/material";
import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import useGetActualUser from "../custom-hooks/useGetActualUser";
import { firebaseDb, firebaseStorage } from "../firebase";
import Input from "../components/ui/Input";
import { Link } from "react-router-dom";
import CustomButton from "../components/ui/CustomButton";
import Post from "../components/ui/Post";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function EditProfile() {
  const {
    profilePic,
    selfUserInfoLoading,
    selfUserInfo,
    AvatarSkeleton,
    profileName,
    banner,
  } = useGetActualUser();
  const [newProfilePhoto, setNewProfilePhoto] = useState("");
  const [newBanner, setNewBanner] = useState("");
  const [newName, setNewName] = useState("");
  const [profilePicUpload, setProfilePicUpload] = useState<null | File>(null);
  const [bannerUpload, setBannerUpload] = useState<null | File>(null);
  const profilePicFileInputRef: any = useRef();
  const bannerFileInputRef: any = useRef();

  function uploadProfileImage(e: {
    //image upload functionality same as one in useSendGlobalMessage
    target: { files: SetStateAction<null | File>[] };
  }) {
    setProfilePicUpload(e.target.files[0]);
  }

  function uploadBannerImage(e: {
    target: { files: SetStateAction<null | File>[] };
  }) {
    setBannerUpload(e.target.files[0]);
  }

  function clearAllInputs() {
    setNewProfilePhoto("");
    setNewBanner("");
    setNewName("");
    setProfilePicUpload(null);
    setBannerUpload(null);
    profilePicFileInputRef.current.value = null;
    bannerFileInputRef.current.value = null;
  }

  function saveChanges(e: any) {
    e.preventDefault();
    if (newName.length > 50) {
      setNewName("");
      alert("name too long");
      return;
    }
    const trimmedInput = newName?.trim();
    const nameList = trimmedInput!.split(" ");

    if (profilePicUpload && bannerUpload) {
      let bannerUrl = "";
      let profilePicUrl = "";

      const bannerName = `profiles/banners/${bannerUpload.name + v4()}`;
      const bannerRef = ref(firebaseStorage, bannerName);

      const profilePicName = `profiles/profile-pics/${
        profilePicUpload.name + v4()
      }`;
      const profilePicRef = ref(firebaseStorage, profilePicName);

      //same logic as the useSendGlobalMessage hook
      uploadBytes(bannerRef, bannerUpload)
        .then(() =>
          getDownloadURL(ref(firebaseStorage, bannerName)).then((url) => {
            bannerUrl = url;
          })
        )
        .then(() =>
          uploadBytes(profilePicRef, profilePicUpload).then(() =>
            getDownloadURL(ref(firebaseStorage, profilePicName))
              .then((url) => {
                profilePicUrl = url;
              })
              .then(() =>
                firebaseDb
                  .collection("users")
                  .doc(selfUserInfo?.id)
                  .set(
                    {
                      ...(!(newName === "" || nameList[0] === "") && {
                        name: newName,
                      }),
                      ...(bannerUpload && {
                        banner: bannerUrl,
                      }),

                      ...(profilePicUpload && {
                        profilepic: profilePicUrl,
                      }),
                    },
                    { merge: true }
                  )
              )
          )
        );

      return;
    }

    if (bannerUpload) {
      let imageUrl = "";
      const imageName = `profiles/banners/${bannerUpload.name + v4()}`;
      const imageRef = ref(firebaseStorage, imageName);
      uploadBytes(imageRef, bannerUpload)
        .then(() =>
          getDownloadURL(ref(firebaseStorage, imageName)).then((url) => {
            imageUrl = url;
          })
        )
        .then(() =>
          firebaseDb
            .collection("users")
            .doc(selfUserInfo?.id)
            .set(
              {
                //this code is absolutely insane and probably shouldnt be used i know, but ill try to explain it
                //when the spread operator returns a false-y value it defaults to {}
                //if the condition is true then it spreads out the right side of the condition
                ...(!(newName === "" || nameList[0] === "") && {
                  name: newName,
                }),
                ...(!(newProfilePhoto === "") && {
                  profilepic: newProfilePhoto,
                }),

                ...(bannerUpload && {
                  banner: imageUrl,
                }),
              },
              { merge: true }
            )
        );
    }

    if (profilePicUpload) {
      //ngl if i ever need to copy paste one of these again im making it a hook cuz its the same stuff over n over again
      let imageUrl = "";
      const imageName = `profiles/profile-pics/${profilePicUpload.name + v4()}`;
      const imageRef = ref(firebaseStorage, imageName);

      uploadBytes(imageRef, profilePicUpload)
        .then(() =>
          getDownloadURL(ref(firebaseStorage, imageName)).then((url) => {
            imageUrl = url;
          })
        )
        .then(() =>
          firebaseDb
            .collection("users")
            .doc(selfUserInfo?.id)
            .set(
              {
                //this code is absolutely insane and probably shouldnt be used i know, but ill try to explain it
                //when the spread operator returns a false-y value it defaults to {}
                //if the condition is true then it spreads out the right side of the condition
                ...(!(newName === "" || nameList[0] === "") && {
                  name: newName,
                }),
                ...(!(newBanner === "") && { banner: newBanner }),
                ...(profilePicUpload && {
                  profilepic: imageUrl,
                }),
              },
              { merge: true }
            )
        );
    }

    firebaseDb
      .collection("users")
      .doc(selfUserInfo?.id)
      .set(
        {
          //this code is absolutely insane and probably shouldnt be used i know, but ill try to explain it
          //when the spread operator returns a false-y value it defaults to {}
          //if the condition is true then it spreads out the right side of the condition
          ...(!(newName === "" || nameList[0] === "") && { name: newName }),
          ...(!(newBanner === "") && { banner: newBanner }),
          ...(!(newProfilePhoto === "") && { profilepic: newProfilePhoto }),
        },
        { merge: true }
      );
  }

  return (
    //this jsx kinda sucks i shouldve used components more
    <div className=" overflow-overlay col-span-1 grid overflow-scroll dark:bg-zinc-800 ">
      {banner || newBanner || bannerUpload ? (
        <div
          onClick={() => bannerFileInputRef.current?.click()}
          className="  relative row-span-2 justify-center"
        >
          <img
            src={
              bannerUpload === null || bannerUpload === undefined
                ? newBanner || banner
                : URL.createObjectURL(bannerUpload as any)
            }
            className="  
            max-h-[190px]
            w-full  object-cover lg:max-h-[180px]  "
            alt=""
          />
          <div
            className=" absolute top-0 left-0 z-20 flex h-full w-full cursor-pointer items-center 
            justify-center  bg-black/40 opacity-0 transition-opacity hover:opacity-100"
          >
            <CameraAlt />
          </div>{" "}
          <input
            multiple={false}
            ref={bannerFileInputRef}
            type="file"
            onChange={(e: any) => uploadBannerImage(e)}
            hidden
          />
        </div>
      ) : (
        <div
          onClick={() => bannerFileInputRef.current?.click()}
          className="relative flex animate-pulse 
          items-center justify-center  p-5 text-2xl italic text-zinc-500 dark:bg-[#242427]
           "
        >
          <p>no banner yet..</p>
          <div
            className=" absolute z-10 flex h-full  w-full cursor-pointer items-center 
            justify-center  bg-black/40 opacity-0 transition-opacity hover:opacity-100"
          >
            <CameraAlt />
          </div>{" "}
          <input
            multiple={false}
            ref={bannerFileInputRef}
            type="file"
            onChange={(e: any) => uploadBannerImage(e)}
            hidden
          />
        </div>
      )}

      <div className=" flex items-center bg-zinc-200   p-5 dark:bg-[#242427] lg:p-3 lg:px-14">
        {selfUserInfoLoading ? (
          <AvatarSkeleton className="!h-20 !w-20 !bg-zinc-200 dark:!bg-zinc-700  " />
        ) : (
          <div
            onClick={() => profilePicFileInputRef.current?.click()}
            className=" relative !h-20  !w-20 "
          >
            <Avatar
              src={
                profilePicUpload === null || profilePicUpload === undefined
                  ? newProfilePhoto || profilePic
                  : URL.createObjectURL(profilePicUpload as any)
              }
              className=" xl: !absolute !top-0  !h-full !w-full !text-center !text-2xl"
            >
              {newName[0] || profileName![0] + profileName![1]}
            </Avatar>

            <input
              multiple={false}
              ref={profilePicFileInputRef}
              type="file"
              onChange={(e: any) => uploadProfileImage(e)}
              hidden
            />

            <div
              className=" absolute !top-0 z-10 flex h-full w-full  cursor-pointer 
            items-center justify-center rounded-full bg-black/70 opacity-0 transition-opacity hover:opacity-100"
            >
              <CameraAlt />
            </div>
          </div>
        )}

        <div className="  ml-3 flex-col items-center justify-center">
          <p className="text-3xl">
            {selfUserInfoLoading ? (
              <span className="mt-2 animate-pulse text-xl italic text-zinc-500">
                loading...
              </span>
            ) : (
              newName || profileName
            )}
          </p>
          <div>
            <p className="flex items-center italic text-zinc-500">
              {" "}
              <Star fontSize="small" />
              's: 67
            </p>
            <p className={`-mt-1 flex items-center italic text-zinc-500`}>
              {" "}
              <Article fontSize="small" />
              's: 52
            </p>
          </div>
        </div>
      </div>

      <div className=" row-span-12  flex w-full flex-col justify-center py-10 px-10 xl:flex-row xl:py-0 ">
        <form
          onSubmit={(e) => saveChanges(e)}
          className=" flex flex-1 flex-col justify-center border-b-2 border-b-zinc-700  py-10 md:pt-0 xl:border-b-0 
        xl:border-r-2 xl:border-r-zinc-700 xl:py-5 xl:px-10  "
        >
          <div>
            <p className="text-xl "> Change your profile here!</p>{" "}
            <p className="italic  text-zinc-500">
              {" "}
              try clicking the profile photo or banner
            </p>
          </div>

          <div className="  flex items-center  gap-3 py-6   ">
            <p className="hidden min-w-[230px] sm:block md:min-w-[260px] md:text-lg">
              Change profile photo with URL:
            </p>{" "}
            <Input
              type="url"
              placeholder="paste pfp url"
              value={newProfilePhoto}
              onChange={setNewProfilePhoto}
            />
          </div>

          <div className="flex   items-center  gap-3  py-6  ">
            <p className=" hidden min-w-[180x] sm:block md:min-w-[210px] md:text-lg">
              Change banner with URL:
            </p>
            <Input
              type="url"
              placeholder="paste banner url"
              onChange={setNewBanner}
              value={newBanner}
            />
          </div>

          <div className="flex  items-center  gap-3  py-6 ">
            <div className="hidden min-w-[140px] sm:block md:min-w-[160px] md:text-lg">
              Change username:
            </div>
            <Input
              type="name"
              placeholder="type in username"
              value={newName}
              onChange={setNewName}
            />
          </div>

          <div
            className="mt-10 flex items-center  justify-between xl:mt-4
          "
          >
            <div className="flex items-center gap-3  md:text-lg ">
              <p className="hidden sm:inline">Save these changes </p>
              <CustomButton type="submit">Save</CustomButton>
            </div>
            <div className="flex items-center gap-3  md:text-lg ">
              <p className="hidden sm:inline">Remove these changes </p>
              <CustomButton onClick={clearAllInputs}>Remove</CustomButton>
            </div>
          </div>
        </form>

        <div className="flex flex-1 flex-col justify-center gap-3 py-10 pb-0 xl:p-10 xl:py-5">
          <div>
            <p className="text-xl ">
              Account feeling boring?? Wanna space things up?
            </p>
            <p className="italic  text-zinc-500"> Create a post !!</p>
          </div>

          <div className=" dark:zincbg mt-4 flex flex-col break-all rounded-md bg-zinc-200 p-4 ">
            <div>
              <p
                className="text-lg font-semibold  text-zinc-800 dark:text-zinc-200 
              "
              >
                Hey, this is the title.
              </p>
            </div>

            <p className="text-md my-2  mb-0 max-h-[220px] overflow-hidden  italic text-zinc-500 xl:max-h-[190px] ">
              Hey, this is the Lorem ipsum sit amet consectetur adipisicing
              elit. Quod dolore aut, molestias dolorem sapiente alias mollitia
              aliquid aliquam. Laboriosam dolores blanditiis ullam illum facere
              eligendi adipisci, architecto possimus natus?
            </p>

            <div className="flex h-[190px] w-full items-center justify-center">
              <img
                src=" https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimagestore.ffm.to%2Flink%2Fac59d4f5144fcd0a989a8c64943f3f3f.jpg&f=1&nofb=1&ipt=2b69b25435f032d39d43afb962e638d3402e6eb07cc83f016156da1ae609309a&ipo=images"
                className="   h-full w-full object-cover  "
                alt=""
              />
            </div>
            <p className="mt-2 text-sm text-zinc-300">
              A demo of how a post can look in your profile!
            </p>
          </div>

          <Link to="/create-post">
            <CustomButton className="!mt-4">+ Create post</CustomButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
