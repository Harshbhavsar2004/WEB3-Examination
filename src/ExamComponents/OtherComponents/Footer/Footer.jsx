import React from "react";
import Mic from "../Detections/Mic";
import QuizFullScreenExit from "../../MainComponent/QuizFullScreenExit";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
   
    <footer>
      <Mic />
      <QuizFullScreenExit />
    </footer>
  );
}

export default Footer;
