import { Commandment, Question } from "@/repositories/interfaces/ICommandments";
import { CookieData, loadFromCookie, saveToCookie } from "./cookiesManager";

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

export function updateCookieData(
    questionnaireNumber: number,
    questionNumber: number,
    optionPhrase: string,
    checked: boolean
): void {

const cookieData: CookieData = loadFromCookie();

    cookieData[questionnaireNumber] ??= {};
    cookieData[questionnaireNumber][questionNumber] ??= [];



    const options = cookieData[questionnaireNumber][questionNumber];
    const index = options.indexOf(optionPhrase);

    if (checked && index === -1) {
        options.push(optionPhrase); 
    } else if (!checked && index > -1) {
        options.splice(index, 1); 
    }
    saveToCookie(cookieData);
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
    const updatedCommandment = deepClone(commandment); 

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


    updateCookieData(
        commandment.questionnaireNumber,
        questionNumber,
        question.options[optionIndex].optionPhrase,
        checked
    );

    return updatedCommandment;
}