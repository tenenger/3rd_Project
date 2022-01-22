import { dbService } from "fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";

function Home({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [getDB, setGetDB] = useState([]);
  useEffect(() => {
    const q = query(
      collection(dbService, "tweets"),
      orderBy("created", "desc")
    );
    onSnapshot(
      q,
      (snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGetDB(tweetArray);
      },
      []
    );
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "tweets"), {
      text: tweet,
      created: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };
  const onChange = (event) => {
    const { value } = event.target;
    setTweet(value);
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
        <input value="트윗남기기" type="submit" />
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
