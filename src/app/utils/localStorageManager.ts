const STORAGE_KEY = "confession-options";

// Função para ordenar os mandamentos numericamente
function sortCommandments(obj: CookieData): CookieData {
    return Object.keys(obj)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .reduce((acc, key) => {
            acc[Number(key)] = obj[Number(key)];
            return acc;
        }, {} as CookieData);
}

// Salvar os dados no localStorage
export function saveToLocalStorage(data: CookieData): void {
    const sortedData = sortCommandments(data);

    try {
        // Serializar e salvar no localStorage
        const serializedData = JSON.stringify(sortedData);
        localStorage.setItem(STORAGE_KEY, serializedData);
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
}

// Carregar os dados do localStorage
export function loadFromLocalStorage(): CookieData {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            // Desserializar os dados salvos
            return JSON.parse(storedData) as CookieData;
        }
    } catch (error) {
        console.error("Error loading from localStorage:", error);
    }

    return {}; // Retorna um objeto vazio se não houver dados
}

// Tipo para os dados
export type CookieData = {
    [questionnaireNumber: number]: {
        [questionNumber: number]: string[];
    };
};