import './Quiz.css'

export default function AnswerOption({answer}) {
  if (!answer) answer = {text: "No answer provided"};
  
  return (
    <div className="answer">
        {answer.text}
    </div>
  );
}