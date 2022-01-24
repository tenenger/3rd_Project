import { dbService, storageService } from "fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Tweet from "components/Tweet";
import { v4 } from "uuid";

function Home({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [getDB, setGetDB] = useState([]);
  const [File, setFile] = useState("");
  const fileInput = useRef();
  useEffect(() => {
    const q = query(
      collection(dbService, "tweets"),
      orderBy("created", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGetDB(tweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    let FileURL = "";
    if (File !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, File, "data_url");
      FileURL = await getDownloadURL(response.ref);
    }
    const content = {
      text: tweet,
      created: Date.now(),
      creatorId: userObj.uid,
      FileURL,
    };
    await addDoc(collection(dbService, "tweets"), content);
    setTweet("");
    setFile("");
    fileInput.current.value = null;
  };
  const onChange = (event) => {
    const { value } = event.target;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const { files } = event.target;
    const myFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(myFile);
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setFile(result);
    };
  };
  const onFileClear = () => {
    setFile("");
    fileInput.current.value = null;
  };
  return (
    <div>
      <form onSubmit={onSubmit} action="">
        <input
          type="text"
          placeholder="오늘 기분은 어떠하신가요?"
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        <input value="트윗남기기" type="submit" />
        {File && (
          <div>
            <img src={File} alt="" width="50px" height="50px" />
            <button onClick={onFileClear}>취소</button>
          </div>
        )}
      </form>
      <div>
        {getDB.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
