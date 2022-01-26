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
  // 내 트윗이 수정될 경우에 다시 불러와야하는데, 그렇지 않은 코드여서 발생한 오류. 만약 useEffect 내부에 메소드를 사용한경우에는 useCallback과 params를 사용한다.
  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
}

export default Profile;
