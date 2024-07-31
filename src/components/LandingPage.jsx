import React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import "./LandingPage.css"; // Import custom CSS styles


const LandingPage = () => {
  return (
    <>
      <Header />
      <div className="landing-page">
        <div className="container">
          <h1 className="heading">Welcome to Secure Pariksha</h1>
          <p className="sub-heading">Unlock Your Potential with Our Comprehensive Online Exam Platform</p>
          <br />
          {/* <div className="cta-buttons">
            <Link to="/register" className="cta-button">
              Sign Up
            </Link>
            <Link to="/login" className="cta-button">
              Log In
            </Link>
          </div> */}
          <div className="features">
            <div className="feature">
              <img src="/Take_Exams_Online_(LandingPage).png" alt="Feature 1" />
              <h3>Take Exams Online</h3>
              <p>Access a wide range of exams and tests from various fields.</p>
            </div>
            <div className="feature">
              <img src="/Follow_Government_Rules_(LandingPage)2.jpg" alt="Feature 2" />
              {/* <h3>Track Your Progress</h3>
              <p>Monitor your performance and improvement over time.</p> */}
              <h3>Follow Government Rules</h3>
              <p>Follow all rules & regulations provided by government to appear for examination.</p>
            </div>
            <div className="feature">
              <img src="/Secure_Exam_Data_(LandingPage).jpeg" alt="Feature 3" />
              {/* <h3>Study Materials</h3>
              <p>Access study materials and resources to help you prepare.</p> */}
              <h3>Secure Exam Data </h3>
              <p>Blockchain is used to Secure Exam Data with Unbreakable Chains of Security.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

