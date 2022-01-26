import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import authform from "./css/Auth.module.css";

function AuthForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // useState 2개 쓰는것을 하나로 줄여준다.
  const { email, password } = form;
  // input에 value값을 줘야하기 때문에 이 코드도 필수이다.
  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const onChange = (event) => {
    const { value, name } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  // input에 넣어진 값을 계속 바꿔준다. 특히 [name]: value는 input에 있는 name값에 value값을 넣어준다. 즉 name이 email이면 email에 value값이 넣어지고, name이 password이면 password인 value값이 넣어진다.

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(authService, email, password);
        alert("회원가입이 완료되었습니다.");
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        setError("회원가입이 되지 않은 사용자입니다.");
      } else if (error.message === "Firebase: Error (auth/invalid-email).") {
        setError("올바른 이메일을 입력해주세요");
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("비밀번호를 6자리 이상으로 입력해주세요");
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        setError("잘못된 비밀번호입니다.");
      } else if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        setError("이미 사용중인 이메일입니다.");
      } else {
        setError(error.message);
      }
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  const style = {
    fontSize: "10px",
    color: "tomato",
    paddingTop: "5px",
  };
  return (
    <div>
      <form className={authform.loginform} onSubmit={onSubmit} action="">
        <div className={authform.emailNpassword}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
            className={authform.login_input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
            className={authform.login_input}
          />
        </div>
        <div>
          <input
            className={authform.submit}
            type="submit"
            value={newAccount ? "회원가입 신청하기" : "로그인"}
            className={[authform.login_input, authform.submit].join(" ")}
          />
        </div>
        <div style={style}>{error}</div>
      </form>
      <div className={authform.signin} onClick={toggleAccount}>
        {newAccount ? "로그인 하러가기" : "회원가입 하러가기"}
      </div>
    </div>
  );
}
export default AuthForm;
