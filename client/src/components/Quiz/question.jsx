import AnswerOption from "./answerOption";

export default function Question({question}) {
  return (
    <div>
      <h1>{question.question}</h1>
        <AnswerOption />
        <AnswerOption />
        <AnswerOption />
        <AnswerOption />
    </div>
  );
}