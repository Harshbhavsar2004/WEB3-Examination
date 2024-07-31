
import React from "react";
import { Component } from "react";
import { Link } from 'react-router-dom';

import Header from "./Header";
import './PolicyPage.css'

class App extends Component {
    render() {
        return (
            <>
                <Header />
                <br />
                <div className="container_policy">
                    <h1> Rules & Regulations to Appear for Examination </h1>

                    <div className="form_data_policy">
                        <ul className="list">
                            <li><p> Please use latest Google Chrome browser for taking examination. </p></li>
                            <li><p> Be sure that no‐body is sitting with you. </p></li>
                            <li><p> Close all browsers/tabs before starting the online examination. </p></li>
                            <li><p> Do not leave the camera. </p></li>
                            <li><p> Do not resize the browser during the exam. </p></li>
                            <li><p> Once the exam starts, do not switch to any other window/tab. </p></li>
                            <li><p> Warning are only shows when you do something unfair activity. </p></li>
                            <li><p> Make sure you have uninterrupted internet connection during the exam. </p></li>
                        </ul>
                        <div className="content">
                            <div>
                                <Link to="/homecloud">
                                    <button id="prc_btn" type="submit"><span> Proceed </span></button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default App;