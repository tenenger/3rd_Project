import React from "react";
import { Link } from "react-router-dom";
import navi from "../components/css/Navigation.module.css";
import { SvgHome, SvgProfile } from "./Svgfile";

function Navigation({ userObj }) {
  return (
    <nav>
      <ul className={navi.list}>
        <li>
          <Link to="/">
            <SvgHome />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <SvgProfile />
            <span>{userObj.displayName}의 프로필</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
