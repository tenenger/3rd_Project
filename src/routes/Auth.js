import React from "react";
import { authService } from "fbase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "components/AuthForm";
import social_login from "../components/css/Auth_social.module.css";

function Auth() {
  const onSocialClick = async (event) => {
    const { name } = event.target;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  return (
    <div className={social_login.outer}>
      <div className={social_login.form}>
        <AuthForm />
        <div className={social_login.social}>
          <button
            className={social_login.google}
            onClick={onSocialClick}
            name="google"
          />
          <button
            className={social_login.github}
            onClick={onSocialClick}
            name="github"
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
