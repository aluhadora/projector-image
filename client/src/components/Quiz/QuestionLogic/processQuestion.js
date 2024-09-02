import planetsSource from "./planetsSource";

export default function processQuestion(question) {
    if (!question) return [];
    if (question.answersFromData === "planets") {
        return planetsSource({excludedAnswers: question.correctAnswers});
    }
}