import Cookies from "js-cookie";
import { checkZero } from './index';

export function formatNum(num: number) {
    const decimal = parseInt(Cookies.get('decimalPlaces') || '2');
    num = checkZero(num);

    return num.toLocaleString('en', {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimal
    })
}

export function pushToRecentSearches(element: string) {
    let cookie = Cookies.get('recentSearches');
    if (cookie === undefined) {
        cookie = '[]';
    }
    const array = JSON.parse(cookie);
    const maxLength = 40;

    let newArray = [element];
    for (const element of array) {
        if (!newArray.includes(element)) {
            newArray.push(element);
        }
    }
    Cookies.set('recentSearches', JSON.stringify(newArray.slice(0, maxLength)));
}