import React, { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { storageService } from "fbase";
import twet_style from "./css/Tweet.module.css";

function Tweet({ tweetObj, isOwner }) {
  const [edit, setEdit] = useState(false);
  const [newtweet, setNewtweet] = useState(tweetObj.text);
  const onDelete = async () => {
    const message = window.confirm("삭제하시겠습니까?");
    const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
    const TweetFile = ref(storageService, tweetObj.FileURL);
    if (message) {
      await deleteDoc(TweetTextRef);
      await deleteObject(TweetFile);
    }
  };
  const ToggleEditing = () => {
    setEdit((prev) => !prev);
  };
  const onChange = (event) => {
    const { value } = event.target;
    setNewtweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
    await updateDoc(TweetTextRef, {
      text: newtweet,
    });
    setEdit(false);
  };
  const imgstyle = {
    width: "200px",
    height: "200px",
  };
  return (
    <div className={twet_style.inner}>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newtweet} type="text" required />
            <input type="submit" value="수정완료" />
          </form>
          <button onClick={ToggleEditing}>취소</button>
        </>
      ) : (
        <div className={twet_style.content}>
          <h4>{tweetObj.text}</h4>
          {tweetObj.FileURL && (
            <img src={tweetObj.FileURL} alt="" style={imgstyle} />
          )}
          {isOwner && (
            <div>
              <button
                className={`${twet_style.delete_btn} ${twet_style.btn}`}
                onClick={onDelete}
              >
                삭제
              </button>
              <button
                className={`${twet_style.update_btn} ${twet_style.btn}`}
                onClick={ToggleEditing}
              >
                수정
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Tweet;
