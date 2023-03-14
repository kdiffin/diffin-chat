import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import Input from "../components/ui/Input";
import CustomButton from "../components/ui/CustomButton";
import Post from "../components/ui/Post";
import useGetActualUser from "../custom-hooks/useGetActualUser";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { firebaseDb, firebase } from "../firebase";

function InputField(props: {
  inputOnChange: Dispatch<SetStateAction<string>>;
  inputTitle: string;
  placeholder: string;
  type: string;
  inputValue: string;
  className?: string;
}) {
  return (
    <div className="flex items-center">
      <p className=" mr-3 min-w-fit">{props.inputTitle}</p>
      <Input
        type={props.type}
        value={props.inputValue}
        onChange={props.inputOnChange}
        placeholder={props.placeholder}
        className={props.className}
      />
    </div>
  );
}

function CreatePost() {
  const [postTitle, setPostTitle] = useState("");
  const [postParagraph, setPostParagraph] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const [postImageURL, setPostImageURL] = useState("");
  const [postBottomText, setPostBottomText] = useState("");
  const postImageRef: any = useRef();
  const { selfUserInfoRef, profileName, selfUserId } = useGetActualUser();
  const navigate = useNavigate();

  function uploadPostImage(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.files ? setPostImage(e.target.files[0]) : null;
  }

  function definerowSpan() {
    let rowSpan = "row-span-1";

    if ((postImage || postImageURL) && postParagraph.length >= 300) {
      rowSpan = "row-span-7";
      return rowSpan;
    }

    if (
      (postImage || postImageURL) &&
      postParagraph.length <= 200 &&
      postParagraph
    ) {
      rowSpan = "row-span-4";
      return rowSpan;
    }

    if ((postImage || postImageURL) && postParagraph.length >= 200) {
      rowSpan = "row-span-6";
      return rowSpan;
    }

    if (!postParagraph && (postImage || postImageURL)) {
      rowSpan = "row-span-3";
      return rowSpan;
    }

    if (!postParagraph) {
      rowSpan = "row-span-1";
      return rowSpan;
    }

    if (postParagraph.length <= 300) {
      rowSpan = "row-span-2";
      return rowSpan;
    }

    if (postParagraph.length >= 300) {
      rowSpan = "row-span-3";
      return rowSpan;
    }

    return rowSpan;
  }

  function submitPost(e: { preventDefault: () => void }) {
    e.preventDefault();

    const rowSpanOfPost = definerowSpan();
    // when we set the two different databases we want them to have the same ids on the submitted post,
    //because then deleting one of them also makes it easy to delete the other one in the database
    const idOfPost = nanoid();

    if (postTitle.length > 80) {
      setPostTitle("");
      alert("No insanely long titles");
      return;
    }

    if (postBottomText.length > 200) {
      setPostBottomText("");
      alert("No insanely long outro texts");
      return;
    }

    if (postParagraph.length > 600) {
      setPostBottomText("");
      alert("No insanely long paragraphs (ill add this later)");
      return;
    }

    const trimmedTitle = postTitle.trim();
    const titleList = trimmedTitle.split(" ");

    if (titleList[0] === "") {
      setPostTitle("");
      alert("dont do that bro");
      return;
    }

    //same logic  as editprofile
    if (postImage) {
      selfUserInfoRef
        ?.collection("posts")
        .doc(idOfPost)
        .set({
          title: postTitle,
          image: URL.createObjectURL(postImage),
          bottomText: postBottomText,
          rowSpan: rowSpanOfPost,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          paragraph: postParagraph,
          userId: selfUserId,
        })
        .then(navigate(`/profiles/${profileName}/${selfUserId}`));
    } else {
      selfUserInfoRef
        ?.collection("posts")
        .doc(idOfPost)
        .set({
          title: postTitle,
          image: postImageURL,
          bottomText: postBottomText,
          rowSpan: rowSpanOfPost,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          paragraph: postParagraph,
          userId: selfUserId,
        })
        .then(navigate(`/profiles/${profileName}/${selfUserId}`));
    }

    if (postImage) {
      firebaseDb
        .collection("allPosts")
        .doc(idOfPost)
        .set({
          title: postTitle,
          image: URL.createObjectURL(postImage),
          bottomText: postBottomText,
          rowSpan: rowSpanOfPost,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          paragraph: postParagraph,
          userId: selfUserId,
        });
    } else {
      firebaseDb.collection("allPosts").doc(idOfPost).set({
        title: postTitle,
        image: postImageURL,
        bottomText: postBottomText,
        rowSpan: rowSpanOfPost,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        paragraph: postParagraph,
        userId: selfUserId,
      });
    }
  }

  return (
    <div className=" overflow-overlay  flex h-full w-full flex-col  xl:flex-row ">
      <div className="flex  flex-1 flex-col justify-center p-8 py-12 md:p-12">
        <div className=" mb-8">
          <p className="  mb-2 flex  justify-center text-2xl font-semibold">
            Share your hot takes!
          </p>

          <p className="flex justify-center italic text-zinc-500">
            be sure to share ur music taste as well o-o
          </p>
        </div>
        <form onSubmit={submitPost} className="flex flex-col gap-10  ">
          <InputField
            inputValue={postTitle}
            inputOnChange={setPostTitle}
            inputTitle="Main text / title:"
            type="text"
            placeholder="Enter post's title (required)"
          />
          <InputField
            inputValue={postParagraph}
            inputOnChange={setPostParagraph}
            inputTitle="Paragraph / topic: "
            type="text"
            placeholder="Enter post's content (optional)"
          />
          <InputField
            inputValue={postImageURL}
            inputOnChange={setPostImageURL}
            inputTitle="Image that represents the post: "
            type="url"
            placeholder="Enter post's image (optional)"
          />
          <InputField
            inputValue={postBottomText}
            inputOnChange={setPostBottomText}
            inputTitle="Text at the bottom of the post: "
            type="text"
            placeholder="Enter post's outro text (optional)"
          />
          <div className="flex flex-col items-center justify-between gap-8  md:flex-row md:gap-0">
            <div className="flex items-center gap-3">
              <p>Upload image by file:</p>
              <CustomButton
                type="button"
                onClick={() => postImageRef.current.click()}
              >
                + UPLOAD
              </CustomButton>
            </div>

            <input
              multiple={false}
              ref={postImageRef}
              type="file"
              onChange={(e) => uploadPostImage(e)}
              hidden
            />

            <div className="flex items-center gap-3">
              <p className=" "> Submit the post: </p>
              <CustomButton type="submit">+ Submit</CustomButton>
            </div>
          </div>
        </form>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center border-t-2  border-t-zinc-700 p-8 py-12 md:p-12 xl:border-t-0 xl:border-l-2 xl:border-l-zinc-700 ">
        <div className=" mb-4 xl:mt-12">
          <p className="   flex  justify-center text-2xl font-semibold">
            Preview of the post you're creating:
          </p>
        </div>

        <Post
          title={postTitle}
          deletePost={undefined}
          paragraph={postParagraph}
          className="w-full"
          bottomText={postBottomText}
          date="Sun, 12 Mar 2023 12:30:23 GMT"
          image={postImage ? URL.createObjectURL(postImage) : postImageURL}
        />
      </div>
    </div>
  );
}

export default CreatePost;
