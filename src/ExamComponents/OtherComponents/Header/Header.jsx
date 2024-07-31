import React from "react";
import Timer from "./Timer";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
          <img src="./App_Logo1.png" alt="App Logo" />
          <h2>Secure Pariksha</h2>
          <hr />
        </div>
      <h1 className="header-title">Blockchain Examination</h1>
      <div className="timer-wrapper">
        <Timer />
      </div>
    </header>
  );
}

export default Header;
