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

// Salvar os dados em múltiplos cookies
export function saveToMultipleCookies(data: CookieData): void {
    const sortedData = sortCommandments(data);
    const entries = Object.entries(sortedData);

    // Dividir os dados em cookies separados
    entries.forEach(([key, value], index) => {
        try {
            setCookie(null, `${COOKIE_NAME}_${index}`, JSON.stringify({ [key]: value }), {
                path: "/",
                maxAge: 30 * 24 * 60 * 60, // 30 dias
            });
        } catch (error) {
            console.error("Error saving to cookie:", error);
        }
    });
}

// Carregar os dados de múltiplos cookies
export function loadFromMultipleCookies(): CookieData {
    const cookies = parseCookies(null);
    const data: CookieData = {};

    Object.keys(cookies)
        .filter((key) => key.startsWith(COOKIE_NAME)) // Filtrar apenas os cookies relevantes
        .forEach((key) => {
            const partialData = JSON.parse(cookies[key]) as CookieData;
            Object.assign(data, partialData); // Mesclar os dados carregados
        });

    return data;
}

// Tipo para os dados do cookie
export type CookieData = {
    [questionnaireNumber: number]: {
        [questionNumber: number]: string[];
    };
};
