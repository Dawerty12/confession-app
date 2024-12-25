import { Commandment, Question } from "@/repositories/interfaces/ICommandments";
import { CookieData, loadFromLocalStorage, saveToLocalStorage } from "./localStorageManager";

export function applyExclusiveLogic(question: Question, exclusiveIndex: number) {
    question.options.forEach((option, index) => {
        if (index !== exclusiveIndex) {
            option.checked = false;
            option.disabled = true;
        }
    });
}

export function enableAllOptions(question: Question) {
    question.options.forEach((option) => {
        delete option.disabled;
    });
}

export function updateLocalStorageData(
    questionnaireNumber: number,
    questionNumber: number,
    optionPhrase: string,
    checked: boolean
): void {
    const localStorageData: CookieData = loadFromLocalStorage();

    localStorageData[questionnaireNumber] ??= {};
    localStorageData[questionnaireNumber][questionNumber] ??= [];

    const options = localStorageData[questionnaireNumber][questionNumber];
    const index = options.indexOf(optionPhrase);

    if (checked && index === -1) {
        options.push(optionPhrase); // Adiciona a opção se marcada
    } else if (!checked && index > -1) {
        options.splice(index, 1); // Remove a opção se desmarcada
    }

    saveToLocalStorage(localStorageData);
}

function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function handleCheckboxChange(
    commandment: Commandment,
    questionNumber: number,
    optionIndex: number,
    checked: boolean
): Commandment {
    const updatedCommandment = deepClone(commandment); // Clonar para evitar mutação

    const question = updatedCommandment.questions.find(
        (q) => q.questionNumber === questionNumber
    );

    if (!question) {
        console.warn(`Pergunta número ${questionNumber} não encontrada.`);
        return updatedCommandment;
    }

    question.options[optionIndex].checked = checked;

    if (checked && question.options[optionIndex].isExclusive) {
        applyExclusiveLogic(question, optionIndex);
    } else if (!checked) {
        enableAllOptions(question);
    }

    updateLocalStorageData(
        commandment.questionnaireNumber,
        questionNumber,
        question.options[optionIndex].optionPhrase,
        checked
    );

    return updatedCommandment;
}