import axios from 'axios';
import { Commandment } from '@/repositories/interfaces/ICommandments';
import { loadFromCookie } from '../utils/cookiesManager';
import { applyExclusiveLogic, enableAllOptions } from '../utils/handleCheckboxChange';

export async function fetchAndUpdateCommandments(): Promise<Commandment[]> {
    const response = await axios.get('/api');
    const fetchedCommandments = response.data;

    const cookieData = loadFromCookie();

    return fetchedCommandments.map((commandment: Commandment) => {
        const questionnaireData = cookieData[commandment.questionnaireNumber] || {};
        return {
            ...commandment,
            questions: commandment.questions.map((question) => {
                const savedOptions = questionnaireData[question.questionNumber] || [];

                const updatedQuestion = {
                    ...question,
                    options: question.options.map((option) => ({
                        ...option,
                        checked: savedOptions.includes(option.optionPhrase)
                    })),
                };

                const exclusiveIndex = updatedQuestion.options.findIndex((option) => option.checked && option.isExclusive);

                if (exclusiveIndex > -1) {
                    applyExclusiveLogic(updatedQuestion, exclusiveIndex);
                } else {
                    enableAllOptions(updatedQuestion);
                }

                return updatedQuestion;
            })
        }
    });
}
