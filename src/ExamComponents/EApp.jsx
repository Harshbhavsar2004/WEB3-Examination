import React from "react";
import Header from "./OtherComponents/Header/Header";
import Footer from "./OtherComponents/Footer/Footer";
import Quiz from "./MainComponent/Quiz";
import './EStyle.css'


function App() {
  return (
    <div className="main">
      <Header />
      <Quiz />
      <Footer />
    </div>
  );
}

export default App;
