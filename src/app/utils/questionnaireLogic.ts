import { Commandment, Question } from "@/repositories/interfaces/ICommandments";
import { CookieData, loadFromCookie, saveToCookie } from "./cookiesManager.ts";

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

export function updateCookieData(
    questionnaireNumber: number,
    questionNumber: number,
    optionPhrase: string,
    checked: boolean
): void {
    // Carregar dados existentes
    const cookieData: CookieData = loadFromCookie();

    // Inicializar estrutura se não existir
    if (!cookieData[questionnaireNumber]) {
        cookieData[questionnaireNumber] = {};
    }
    if (!cookieData[questionnaireNumber][questionNumber]) {
        cookieData[questionnaireNumber][questionNumber] = [];
    }

    // Atualizar os dados com base na ação (checked / unchecked)
    const options = cookieData[questionnaireNumber][questionNumber];

    if (checked) {
        // Adicionar se não existir
        if (!options.includes(optionPhrase)) {
            options.push(optionPhrase);
        }
    } else {
        // Remover a opção desmarcada
        cookieData[questionnaireNumber][questionNumber] = options.filter(
            (option) => option !== optionPhrase
        );
    }

    // Salvar os dados atualizados no cookie
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
    const updatedCommandment = deepClone(commandment); // Função para evitar mutações diretas

    const question = updatedCommandment.questions.find(
        (q) => q.questionNumber === questionNumber
    );

    if (!question) {
        console.warn(`Pergunta número ${questionNumber} não encontrada.`);
        return updatedCommandment;
    }

    // Atualizar a checkbox
    question.options[optionIndex].checked = checked;

    // Aplicar lógica de exclusividade, se necessário
    if (checked && question.options[optionIndex].isExclusive) {
        applyExclusiveLogic(question, optionIndex);
    } else if (!checked) {
        enableAllOptions(question);
    }

    // Atualizar cookie
    updateCookieData(
        commandment.questionnaireNumber,
        questionNumber,
        question.options[optionIndex].optionPhrase,
        checked
    );

    return updatedCommandment;
}