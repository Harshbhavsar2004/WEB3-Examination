import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import './ExamDashboard.css';

const ExamDetails = () => {
    return (
        <>
            <Header />
            <div className="exam-container">
                <h1 className="exam-title">Exam Details</h1>
                <nav className="exam-nav">
                    <div className="exam-data">
                        <div className="exam-card">
                            <img src="./blockchain_exam_(ExamDashboard).jpeg" alt="exam-thumbnail" className="exam-thumbnail" />
                            <div className="exam-info">
                                <h2 className="exam-name">Blockchain Exam</h2>
                                <p className="exam-date">Date: July 31, 2024</p>
                                <p className="exam-time">Time: 11:00 AM - 1:00 PM</p>
                                <p className="exam-duration">Duration: 2 hours</p>
                                <p className="exam-location">Location: Online</p>

                                <Link to="/policy">
                                    <button className="btn-start-exam-main" type="submit">
                                        <span>Start Exam</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default ExamDetails;
