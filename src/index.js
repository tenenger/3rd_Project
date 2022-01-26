import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import InitApp from "fbase";

console.log(InitApp);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
