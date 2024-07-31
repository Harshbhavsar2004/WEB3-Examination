
import { React } from 'react';
import { Link } from 'react-router-dom';

import Header from "./Header";
import './ExamDashboard.css';

const ExamDetails = () => {


    return (
        <>
            <Header />
            <div className="container">
                <h1>Exam Details</h1>

                <nav>
                    <div className="form_data">
                        <div className="exam-card">
                            <img src="./blockchain_exam_(ExamDashboard).jpeg" alt="exam-thumbnail" className="exam-thumbnail" />
                            <div className="exam-info">
                                <h2>Blockchain Exam</h2>
                                <p>Date: July 31, 2024</p>
                                <p>Time: 11:00 AM - 1:00 PM</p>
                                <p>Duration: 2 hours</p>
                                <p>Location: Online</p>

                                <Link to="/policy">
                                    <button className="btn btn-primary1" type="submit"><span> Start Exam </span></button>
                                </Link>
                                {/* <button className="btn btn-primary1">Start Exam</button> */}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default ExamDetails;
