import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

function Profile({ userObj }) {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const getMyTweets = async () => {
    const q = query(
      collection(dbService, "tweets"),
      where("creatorId", "==", `${userObj.uid}`),
      orderBy("created", "desc")
    );
    // query는 noSQL에서 사용할 수 없는 기능을 사용가능하게 만들어준다. 지금같은경우에는 모든 트윗을 가져오는 것이다.
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
}

export default Profile;
