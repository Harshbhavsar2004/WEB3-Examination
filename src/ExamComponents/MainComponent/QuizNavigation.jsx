import React from 'react';
import "./QuizNavigation.css"
const QuizNavigation = ({ totalQuestions, setCurrentQuestion }) => {
  const handleQuestionButtonClick = (questionNumber) => {
    setCurrentQuestion(questionNumber - 1); // Adjusting for array index (0-based)
  };

  // Generate buttons for each question number
  const renderQuestionButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalQuestions; i++) {
      buttons.push(
        <button key={i} onClick={() => handleQuestionButtonClick(i)}>
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="quiz-navigation">
      {renderQuestionButtons()}
    </div>
  );
};

export default QuizNavigation;
