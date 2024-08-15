import React, { useState } from "react";
import questions from "./QuestionData";
import "./QuestionData.css";
import QuizStatus from "./QuizStatus"; // Adjust the path as per your file structure
import FaceDetection from "../OtherComponents/Detections/Pose_Detection";
import QuizNavigation from "./QuizNavigation";
import { FullScreen } from "react-full-screen";
import ResizeComponent from "../../components/Fullscreen2";
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [markedForReview, setMarkedForReview] = useState(
    Array(questions.length).fill(false)
  );
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to handle clicking an answer option
  const handleAnswerOptionClick = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  // Function to navigate to the next question
  const handleSaveAndNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Function to clear the selected response
  const handleClearResponse = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = null;
    setAnswers(newAnswers);
  };

  // Function to mark a question for review
  const handleMarkForReview = () => {
    const newMarkedForReview = [...markedForReview];
    newMarkedForReview[currentQuestion] = true;
    setMarkedForReview(newMarkedForReview);
  };

  // Function to save and mark a question for review and move to the next question
  const handleSaveAndMarkForReview = () => {
    handleMarkForReview();
    handleSaveAndNext();
  };

  // Function to handle selecting an option
  const handleOptionChange = (index) => {
    handleAnswerOptionClick(index);
  };

  const handleSubmitAndClose = async () => {
    let newScore = 0;
    answers.forEach((answer, index) => {
      if (answer !== null && questions[index].answerOptions[answer].isCorrect) {
        newScore++;
      }
    });
    setScore(newScore);
    setIsSubmitted(!isSubmitted);

    // Send score to the backend
    const token = localStorage.getItem('usersdatatoken');
    try {
      const response = await fetch('https://first-project-backend-ycff.onrender.com/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ Score: newScore })
      });
      
      if (response.ok) {
        console.log('Score saved to backend');
      } else {
        console.error('Error saving score to backend', response.statusText);
      }
    } catch (error) {
      console.error('Error saving score to backend', error);
    }


   try {
      await fetch('https://first-project-backend-ycff.onrender.com/submit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ submit: true })
        });
  } catch (error) {
      console.error('Error submiting:', error);
  }
//


};

  const handleHome = async () => {
    // Call resetCounts endpoint
    window.location.href = "/dash";
  };

  // Render result if quiz is submitted
  // Render result if quiz is submitted
  if (isSubmitted) {
    return (
      <div className="result">
        <h2>
          Your Score: {score} / {questions.length}
        </h2>
        <button onClick={handleHome}>Go to Home Page</button>
      </div>
    );
  } 

  // Render quiz questions and answer options
  return (
    <div className="mainking">
      <div className="quiz">
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <hr />
          <div className="question-text">
            {questions[currentQuestion].questionText}
          </div>
        </div>
        <div className="answer-section">
          {questions[currentQuestion].answerOptions.map((option, index) => (
            <div
              key={index}
              className={`answer-option ${
                answers[currentQuestion] === index ? "selected" : ""
              }`}
              onClick={() => handleOptionChange(index)}
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                checked={answers[currentQuestion] === index}
                onChange={() => handleOptionChange(index)}
              />
              <label>{option.answerText}</label>
            </div>
          ))}
        </div>
        <div className="button-section">
          <button
            onClick={handleSaveAndNext}
            disabled={answers[currentQuestion] === null}
          >
            Save and Next
          </button>
          <button onClick={handleClearResponse}>Clear Response</button>
          <button onClick={handleMarkForReview}>Mark for Review</button>
          <button
            onClick={handleSaveAndMarkForReview}
            disabled={answers[currentQuestion] === null}
          >
            Save and Mark for Review
          </button>
          <button onClick={handleSubmitAndClose}>Submit and Close</button>
        </div>

        {/* Render quiz status component */}
      </div>
      <div className="main-3">
        <FaceDetection />
      </div>
      <div className="main-2">
        <QuizStatus answers={answers} markedForReview={markedForReview} />
      </div>
      <div className="main-4">
        {/* Quiz Navigation Component */}
        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          setCurrentQuestion={setCurrentQuestion}
        />
      </div>
      <div>
        <ResizeComponent/>
      </div>
    </div>
  );
};

export default Quiz;
