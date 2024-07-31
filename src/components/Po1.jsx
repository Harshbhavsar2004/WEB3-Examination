// `rewrite below code in component function:
import React from "react";
import { Component, useState } from "react";
import { Link } from 'react-router-dom';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import Header from "./Header";
import './PolicyPage.css'

const App = () => {

    const handle = useFullScreenHandle();

    return (
        <>
          <Header />
          <br />
          <div className="container_policy">
            <h1> Rules & Regulations to Appear for Examination </h1>
    
            <div className="form_data_policy">
              <ul className="list">
                <li>
                  <p> Please use the latest Google Chrome browser for taking the examination. </p>
                </li>
                <li>
                  <p> Be sure that nobody is sitting with you. </p>
                </li>
                <li>
                  <p> Close all browsers/tabs before starting the online examination. </p>
                </li>
                <li>
                  <p> Do not leave the camera. </p>
                </li>
                <li>
                  <p> Do not resize the browser during the exam. </p>
                </li>
                <li>
                  <p> Once the exam starts, do not switch to any other window/tab. </p>
                </li>
                <li>
                  <p> Warnings are only shown when you do something unfair activity. </p>
                </li>
                <li>
                  <p> Make sure you have an uninterrupted internet connection during the exam. </p>
                </li>
              </ul>
              <div className="content">
                <div className="text-center">
                  <FullScreen handle={handle}>
                    <Link to="/eapp">
                      <button onClick={handle.enter} className="start-button">
                        Start Exam
                      </button>
                    </Link>
                  </FullScreen>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    };
    
    export default App;