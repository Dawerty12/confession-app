import { Commandment, Question } from "@/repositories/interfaces/ICommandments";

function applyExclusiveLogic(question: Question, exclusiveIndex: number) {
    question.options.forEach((option, index) => {
        if (index !== exclusiveIndex) {
            option.checked = false;
            option.disabled = true;
        }
    });
}

function enableAllOptions(question: Question) {
    question.options.forEach((option) => {
        delete option.disabled;
    });
}

export function handleCheckboxChange(
    commandment: Commandment,
    questionNumber: number,
    optionIndex: number,
    checked: boolean
): Commandment {
    const updatedCommandment = JSON.parse(JSON.stringify(commandment)) as Commandment;

    const question = updatedCommandment.questions.find(q => q.questionNumber === questionNumber);

    if (!question) {
        console.warn(`Pergunta número ${questionNumber} não encontrada.`);
        return updatedCommandment;
    }

    question.options[optionIndex].checked = checked;

    if (checked) {
        if (question.options[optionIndex].isExclusive) {
            applyExclusiveLogic(question, optionIndex);
        }
    } else {
        enableAllOptions(question);
    }

    console.log(`Updated question:`, question);

    return updatedCommandment;
}
