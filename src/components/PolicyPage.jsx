
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
                            <li><p>Please use the latest Google Chrome browser for taking the examination.</p></li>
                            <li><p>Be sure that nobody is sitting with you.</p></li>
                            <li><p>Close all browsers/tabs before starting the online examination.</p></li>
                            <li><p>Do not leave the camera.</p></li>
                            <li><p>Do not resize the browser during the exam.</p></li>
                            <li><p>Once the exam starts, do not switch to any other window/tab.</p></li>
                            <li><p>Warnings are only shown when you engage in unfair activity.</p></li>
                            <li><p>Make sure you have an uninterrupted internet connection during the exam.</p></li>
                            <li><p><strong>If any misbehavior is caught more than 5 times, the exam will be suspended</strong>.</p></li>

                        </ul>
                        <div className="content">
                            <div>
                                <Link to="/home">
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