import axios from 'axios';
import { Commandment } from '@/repositories/interfaces/ICommandments';
import { loadFromCookie } from '../utils/cookiesManager';

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
                return {
                    ...question,
                    options: question.options.map((option) => ({
                        ...option,
                        checked: savedOptions.includes(option.optionPhrase),
                    })),
                };
            }),
        };
    });
}
