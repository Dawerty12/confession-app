import { Commandment } from "@/repositories/interfaces/ICommandments";

export function handleCheckboxChange(
    commandment: Commandment,
    questionNumber: number,
    optionIndex: number,
    checked: boolean
): Commandment {

    const updatedCommandment = JSON.parse(JSON.stringify(commandment)) as Commandment;

    const question = updatedCommandment.questions.find(q => q.questionNumber === questionNumber);
    if (!question) return updatedCommandment;

    question.options[optionIndex].checked = checked;

    if (checked) {
        if (question.options[optionIndex].isExclusive) {
            question.options.forEach((option, index) => {
                if (index !== optionIndex) {
                    option.checked = false;
                    option.disabled = true;
                }
            })
        }
    }
    else {
        question.options.forEach((option) => {
            delete option.disabled;
        });
    }
    return updatedCommandment;
}