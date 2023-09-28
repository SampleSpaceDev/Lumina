export * from './js-cookie';

export function checkZero(value: any) {
    return !value || isNaN(value) ? 0 : value;
}

export function isEmpty(object: Object) {
    return Object.keys(object).length === 0 && object.constructor === Object;
}