'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Commandment } from '@/repositories/interfaces/ICommandments';
import { handleCheckboxChange } from '@/app/utils/checkboxLogic';

const CommandmentsList = () => {
    const [commandments, setCommandments] = useState<Commandment[]>([]);

    useEffect(() => {
        const fetchCommandments = async () => {
            try {
                const response = await axios.get('/api');
                setCommandments(response.data);
            } catch (error) {
                console.error("Error fetching commandments:", error);
            }
        };

        fetchCommandments();
    }, []);

    const handleCheckbox = (
        questionnaireNumber: number,
        questionNumber: number,
        optionIndex: number,
        isChecked: boolean
    ) => {
        setCommandments(prevCommandments =>
            prevCommandments.map((commandment) =>
                commandment.questionnaireNumber === questionnaireNumber
                    ? handleCheckboxChange(commandment, questionNumber, optionIndex, isChecked)
                    : commandment
            )
        );
    };

    return (
        <div className="w-full p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Commandments</h1>
            <ul className="bg-white p-4 rounded-md">
                {commandments.map((commandment) => (
                    <li key={commandment.questionnaireNumber} className="mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold">
                            {commandment.questionnaireNumber}. {commandment.questionnaireTitle}
                        </h2>
                        {commandment.questionnaireSubtitle && (
                            <p className="text-gray-600">{commandment.questionnaireSubtitle}</p>
                        )}
                        <ul className="mt-4">
                            {commandment.questions.map((question) => (
                                <li key={question.questionNumber} className="mb-4">
                                    <h3 className="font-semibold">
                                        {question.questionNumber}. {question.questionTitle}
                                    </h3>
                                    <ul className="ml-4">
                                        {question.options.map((option, index) => (
                                            <li
                                                key={index}
                                                className={`flex items-center space-x-2 ${option.disabled ? 'opacity-50' : ''}`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={option.checked || false}
                                                    disabled={option.disabled || false}
                                                    onChange={(e) =>
                                                        handleCheckbox(
                                                            commandment.questionnaireNumber,
                                                            question.questionNumber,
                                                            index,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <label className="text-gray-700">{option.optionPhrase}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommandmentsList;