import '../../App.css';
import React from "react";
import Question from './question';
import questions from './questions.json';


function QuizApp() {
  return (
    <div style={{overflowX: "hidden"}}>
      <Question question={questions.questions[0]} />
    </div>
    
  );
}

export default QuizApp;
