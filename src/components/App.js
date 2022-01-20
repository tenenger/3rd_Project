import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [LoggIn, setLoggIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setLoggIn(true);
      } else {
        setLoggIn(false);
      }
      setInit(true);
    });
  }, []);
  // firebase의 데이터를 로딩하기전에 로그인이 되어있으면 null이 되어 home페이지로 이동하지 못한다. 그래서 onAuthStateChanged는 firebase가 전부 로딩된 다음에 작업하게 도와준다. 여기서 user는 authService.currentUser이다.
  return (
    <>
      {init ? <AppRouter LoggIn={LoggIn} /> : "로그인중입니다."}
      <footer>&copy; {new Date().getFullYear()} twitter</footer>
    </>
  );
}

export default App;
