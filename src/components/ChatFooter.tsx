import {
  Dispatch,
  MouseEventHandler,
  RefObject,
  SetStateAction,
  useState,
} from "react";
import { Clear, Link as MUILinkIcon, Photo, Send } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

function ChatFooter(
  //u need to do this weird props and ref thing for forward ref to work
  props: {
    sendPost: MouseEventHandler<HTMLButtonElement>;
    inputRef: RefObject<HTMLInputElement> | undefined;
    fileInputRef: RefObject<HTMLInputElement> | undefined;
    imageInputRef: RefObject<HTMLInputElement> | undefined;
    clearValueOfRef(ref: HTMLInputElement | null): void;
    onFileChange: (e: any) => void;
    imageUpload: null | File;
    setImageUpload: Dispatch<SetStateAction<null | File>>;
  }
) {
  const [showUploadImage, setShowUploadImage] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [showSendURLImage, setShowSendURLImage] = useState(false);

  return (
    <div
      className=" sticky bottom-0 z-10  flex  items-center  justify-center
      bg-[#ececee] p-1        pb-4  transition duration-500 dark:bg-zinc-800"
    >
      <div
        className="  dark:zincbg bottom sticky w-[96%] rounded-lg border-2 
      bg-zinc-200 p-2 transition duration-500    dark:border-none dark:text-white "
      >
        <div className="  relative flex  items-center rounded-3xl p-[5px]  ">
          <IconButton
            onClick={() => {
              setShowSendURLImage(false);
              setShowImagePreview(false);
              props.clearValueOfRef(props.fileInputRef!.current);
              props.clearValueOfRef(props.imageInputRef!.current);
              setShowUploadImage((prevImg) => !prevImg);
            }}
          >
            <Photo className="cursor-pointer " />
          </IconButton>

          <form className="flex flex-1    ">
            <input
              spellCheck="false"
              type="text"
              ref={props.inputRef}
              className="ml-2 flex-1 border-0  bg-transparent font-semibold outline-none "
              placeholder="Send a message"
            />

            {showSendURLImage ? (
              <div className="dark:zincbg absolute -top-14 left-0 flex w-1/2 max-w-[400px] items-center rounded-md border-2  border-zinc-700/40 bg-zinc-200  px-2">
                <MUILinkIcon className="!text-lg text-zinc-500  " />
                <input
                  spellCheck="false"
                  className="flex-1 rounded-md bg-transparent  p-2 text-sm
                     font-semibold outline-none placeholder:text-xs placeholder:italic 
                    placeholder:text-zinc-500 "
                  type="url"
                  placeholder="Paste img URL here"
                  ref={props.imageInputRef}
                />
              </div>
            ) : null}

            {showUploadImage ? (
              <div className=" absolute  -top-28 left-0 rounded-lg bg-zinc-300 text-zinc-800 dark:bg-zinc-900 dark:text-white">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowUploadImage(false);
                    setShowSendURLImage(true);
                  }}
                  className="flex  cursor-pointer select-none  items-center !p-3 
                   !lowercase !text-zinc-800 dark:!text-white "
                >
                  <MUILinkIcon fontSize="small"></MUILinkIcon>
                  <p className="ml-1   text-sm">Upload image by URL</p>
                </Button>

                <hr className="h-[0.1px] border-none bg-white dark:bg-zinc-700" />

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    props.fileInputRef?.current?.click();
                    setShowUploadImage(false);
                    setShowImagePreview(true);
                  }}
                  className="flex   cursor-pointer select-none items-center !p-3  !lowercase 
                   !text-zinc-800 active:scale-95 dark:!text-white  "
                >
                  <InsertDriveFileIcon fontSize="small"></InsertDriveFileIcon>
                  <p className="ml-1  text-sm">Upload image by file</p>
                </Button>
              </div>
            ) : null}

            <input
              multiple={false}
              ref={props.fileInputRef}
              type="file"
              onChange={(e) => props.onFileChange(e)}
              hidden
            />

            <IconButton
              type="submit"
              className=" flex sm:opacity-0"
              onClick={props.sendPost}
            >
              <Send />
            </IconButton>
          </form>
        </div>

        {showImagePreview ? (
          <div
            className="dark:zincbg absolute right-5 -top-[280px] flex h-[280px] 
          w-full max-w-[350px] items-center justify-center overflow-hidden rounded-t-xl bg-zinc-200  md:w-1/3"
          >
            {props.imageUpload ? (
              <img
                src={URL.createObjectURL(props.imageUpload)}
                alt={props.imageUpload.name}
                className="  max-h-[inherit]    object-cover "
              />
            ) : (
              <p className="text-lg italic text-zinc-600  ">
                No image uploaded
              </p>
            )}
            <IconButton
              className="!absolute !top-2 !right-2"
              onClick={() => {
                // its ok to set this as ! cuz i added checking for undefined in the function itself
                props.clearValueOfRef(props.fileInputRef!.current);
                props.setImageUpload(null);
                setShowImagePreview((prevState) => !prevState);
              }}
            >
              <Clear />
            </IconButton>
          </div>
        ) : null}
      </div>
    </div>
  );
}

//forward ref gives the ref to the parent component, u need to use this when passing down refs
// const forwardChatFooter = forwardRef(ChatFooter);

export default ChatFooter;
