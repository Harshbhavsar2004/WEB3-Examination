import React from 'react';
import "./QuizStatus.css"
const QuizStatus = ({ answers, markedForReview }) => {
  // Calculate counts based on answers and markedForReview arrays
  const counts = {
    notVisited: answers.filter(answer => answer === null).length,
    notAnswered: answers.filter(answer => answer === null && !markedForReview.includes(true)).length,
    answeredAndMarkedForReview: answers.filter((answer, index) => answer !== null && markedForReview[index]).length,
    answered: answers.filter(answer => answer !== null && !markedForReview.includes(true)).length,
    markedForReview: markedForReview.filter(review => review).length
  };

  return (
    <div className="buttons-box">
      <div className="buttons-box-container">
        <button className="nv" name="Not Visited">
          {counts.notVisited}
        </button>
        <p className="gray">Not Visited</p>
      </div>
      <div className="buttons-box-container">
        <button className="na" name="Not Answered">
          {counts.notAnswered}
        </button>
        <p className="red">Not Answered</p>
      </div>
      <div className="buttons-box-container">
        <button className="amr" name="Answered & Marked for Review">
          {counts.answeredAndMarkedForReview}
        </button>
        <p className="yellow">Answered & Marked for Review</p>
      </div>
      <div className="buttons-box-container">
        <button className="a" name="Answered">
          {counts.answered}
        </button>
        <p className="green">Answered</p>
      </div>
      <div className="buttons-box-container">
        <button className="mr" name="Marked for Review">
          {counts.markedForReview}
        </button>
        <p className="blue">Marked for Review</p>
      </div>
    </div>
  );
};

export default QuizStatus;
