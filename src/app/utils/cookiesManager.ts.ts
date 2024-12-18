import { setCookie, parseCookies } from "nookies";
import { Commandment } from "@/repositories/interfaces/ICommandments";

const COOKIE_NAME = "confession-options";


function sortCommandments(obj: CookieData): CookieData {
    return Object.keys(obj)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .reduce((acc, key) => {
        acc[Number(key)] = obj[Number(key)];
        return acc;
    }, {} as CookieData);
}

export function saveToCookie(data: CookieData): void {
    const sortedData = sortCommandments(data);

    try {
        setCookie(null, COOKIE_NAME, JSON.stringify(sortedData), {
            path: "/",
            maxAge: 30 * 24 * 60 * 60, // 30 dias
        });
    } catch (error) {
        console.error("Error saving to cookie:", error);
    }
}
export function loadFromCookie(): CookieData {
    const cookie = parseCookies(null)[COOKIE_NAME];
    return cookie ? (JSON.parse(cookie) as CookieData) : {};
}

export type CookieData = {
    [questionnaireNumber: number]: {
        [questionNumber: number]: string[];
    };
};