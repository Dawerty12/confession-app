export interface Option {
    optionPhrase: string;
    isExclusive?: boolean;
    openDialog?: boolean;
    checked?: boolean;
    disabled?: boolean;
    relatedText?: string; 
}

export interface Question {
    questionNumber: number;
    questionTitle: string;
    options: Option[];
}

export interface Commandment {
    questionnaireNumber: number;
    questionnaireTitle: string;
    questionnaireSubtitle?: string;
    questions: Question[];
}
