import React, { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

function Tweet({ tweetObj, isOwner }) {
  const [edit, setEdit] = useState(false);
  const [newtweet, setNewtweet] = useState(tweetObj.text);
  const onDelete = async () => {
    const message = window.confirm("삭제하시겠습니까?");
    const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
    if (message) {
      await deleteDoc(TweetTextRef);
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
  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newtweet} type="text" required />
            <input type="submit" value="수정완료" />
          </form>
          <button onClick={ToggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDelete}>삭제</button>
              <button onClick={ToggleEditing}>수정</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
export default Tweet;
