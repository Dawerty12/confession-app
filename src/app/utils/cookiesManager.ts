import { setCookie, parseCookies } from "nookies";

const COOKIE_NAME = "confession-options";

// Função para ordenar os mandamentos numericamente
function sortCommandments(obj: CookieData): CookieData {
    return Object.keys(obj)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .reduce((acc, key) => {
            acc[Number(key)] = obj[Number(key)];
            return acc;
        }, {} as CookieData);
}

// Salvar os dados em um único cookie
export function saveToSingleCookie(data: CookieData): void {
    const sortedData = sortCommandments(data);

    try {
        // Serializar os dados como JSON compactado
        const serializedData = JSON.stringify(sortedData);
        setCookie(null, COOKIE_NAME, serializedData, {
            path: "/",
            maxAge: 30 * 24 * 60 * 60, // 30 dias
        });
    } catch (error) {
        console.error("Error saving to cookie:", error);
    }
}

// Carregar os dados de um único cookie
export function loadFromSingleCookie(): CookieData {
    const cookies = parseCookies(null);

    if (cookies[COOKIE_NAME]) {
        try {
            // Desserializar os dados do cookie
            return JSON.parse(cookies[COOKIE_NAME]) as CookieData;
        } catch (error) {
            console.error("Error loading from cookie:", error);
            return {};
        }
    }

    return {};
}

// Tipo para os dados do cookie
export type CookieData = {
    [questionnaireNumber: number]: {
        [questionNumber: number]: string[];
    };
};
