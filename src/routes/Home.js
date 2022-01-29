import { dbService } from "fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import home_style from "../components/css/home.module.css";

function Home({ userObj }) {
  const [getDB, setGetDB] = useState([]);

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

  return (
    <div className={home_style.outer}>
      <TweetFactory userObj={userObj} />
      <div className={home_style.inner}>
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
