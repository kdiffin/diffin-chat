import { Close, GitHub } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase";

function RulesPopUp({
  isPopUpOpen,
  closePopUp,
}: {
  isPopUpOpen: boolean;
  closePopUp: VoidFunction;
}) {
  function ParagraphComponent(props: {
    children:
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactFragment
      | React.ReactPortal;
  }) {
    return (
      <>
        <div className="p-2 text-lg">{props.children}</div>
        <Divider
          sx={{
            background: " rgb(69 69 70);",
          }}
        />
      </>
    );
  }

  function ListContainer(props: {
    children:
      | React.ReactFragment
      | React.ReactElement<React.JSXElementConstructor<any>>;
  }) {
    return <div className=" flex flex-col gap-2 p-4">{props.children}</div>;
  }

  const [user, userLoading] = useAuthState(firebaseAuth as any);

  return (
    <Dialog
      open={isPopUpOpen}
      onClose={closePopUp}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      fullWidth={true}
      maxWidth={"lg"}
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle
        className=" dark:zincbg  relative flex items-center justify-between  bg-zinc-200 !text-2xl text-zinc-800 dark:text-zinc-300  "
        id="scroll-dialog-title"
      >
        Hey {userLoading ? "..." : user?.displayName}!
        <IconButton onClick={closePopUp}>
          <Close className="   !text-white"></Close>
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers={true}
        sx={{
          borderTopColor: " rgb(69 69 70);",
        }}
        className="dark:zincbg bg-zinc-200 "
      >
        <DialogContentText
          id="scroll-dialog-description"
          className="!text-zinc-800 dark:!text-zinc-300"
          tabIndex={-1}
        >
          <p className="mb-2 text-xl ">
            Some things to be aware of before proceeding:
          </p>

          <ListContainer>
            <div>
              <p className="text-lg">
                This site is a work in progress! if you have any bugs you want
                to fix or suggestions feel free to either:
              </p>

              <div className="flex flex-col gap-4 p-4">
                <p className="text-md flex items-center gap-2 ">
                  DM me on discord:{" "}
                  <a
                    href="https://discord.com/users/593007920417996821 "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipartcraft.com%2Fimages%2Fdiscord-logo-transparent-rainbow-1.png&f=1&nofb=1&ipt=397283c329e7683d958a6a563c1417d7f5cd310e4fe820d53bcc215dd00bf93a&ipo=images"
                      alt=""
                      className="h-4 w-[22px] "
                    />
                  </a>
                </p>

                <p className="text-md flex items-center gap-2 ">
                  Submit a pull request:
                  <a
                    href="https://github.com/diffim/diffin-chat/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub />
                  </a>
                </p>
              </div>
            </div>

            <Divider
              sx={{
                background: " rgb(69 69 70);",
              }}
            />

            <ParagraphComponent>
              If you send an image with the URL and it doesnt show up, simply
              send the message again and it'll be sent.
              <p className="mt-1 ml-3 w-3/4 text-sm  italic text-zinc-600">
                this is a bug that has something to do with how react useState()
                function is asynchronous and wont immediately give the imageURL
                inputs ref a value, therefor it returning undefined
              </p>
            </ParagraphComponent>

            <ParagraphComponent>
              Just because the rules didnt say so, doesn't mean its ok to do it
            </ParagraphComponent>

            <ParagraphComponent>
              Please refrain from posting any gore or NSFW content{" "}
            </ParagraphComponent>

            <ParagraphComponent>
              Refrain from judging people based on there religion, race,
              ethnicity etc etc
            </ParagraphComponent>

            <ParagraphComponent>* Some boring rules *</ParagraphComponent>
          </ListContainer>

          <p className="mb-2 mt-2 text-xl ">
            Shortcuts you should be aware of:{" "}
          </p>

          <ListContainer>
            <ParagraphComponent>
              CTRL + ": opens up the searchbar and focuses it
            </ParagraphComponent>
            <ParagraphComponent>
              ESC: automatically scrolls chat down to bottom // closes popup
            </ParagraphComponent>
          </ListContainer>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default RulesPopUp;
