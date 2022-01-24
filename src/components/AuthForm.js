import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";

function AuthForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // useState 2개 쓰는것을 하나로 줄여준다.
  const { email, password } = form;
  // input에 value값을 줘야하기 때문에 이 코드도 필수이다.
  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState(true);
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
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <>
      <form onSubmit={onSubmit} action="">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "로그인" : "회원가입"}</span>
    </>
  );
}
export default AuthForm;
