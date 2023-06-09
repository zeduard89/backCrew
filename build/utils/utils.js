"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums/enums");
//! Parseo las variables
const parseComment = (commentFromRequest) => {
    if (!isString(commentFromRequest)) {
        throw new Error('Incorrect or missing comment');
    }
    return commentFromRequest;
};
const parseDate = (dateFromRequest) => {
    if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
        throw new Error('Incorrect or missing date');
    }
    return dateFromRequest;
};
const parseWeather = (weatherFromRequest) => {
    if (!isString(weatherFromRequest) || !isWeather(weatherFromRequest)) {
        throw new Error('Incorrect or missing weather');
    }
    return weatherFromRequest;
};
const parseVisibility = (visibilityFromRequest) => {
    if (!isString(visibilityFromRequest) || !isVisibility(visibilityFromRequest)) {
        throw new Error('Incorrect or missing visibility');
    }
    return visibilityFromRequest;
};
//! Condiciones auxiliares
// Hay dos formas de crear String
// A) const msg = 'hola mundo'  B) const b = new String('hola mundo 2')
// A) es un string y B) es un objeto
const isString = (string) => {
    return typeof string === 'string' || string instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// const isWeather = (string: string): boolean => {
//     return ['sunny','rainy','cloudy','windy','stormy'].includes(string)
// }
const isWeather = (params) => {
    return Object.values(enums_1.Weather).includes(params);
};
const isVisibility = (params) => {
    return Object.values(enums_1.Visibility).includes(params);
};
//! Construccion final del entry validado
const toNewDiaryEntry = (object) => {
    const newEntry = {
        comment: parseComment(object.comment),
        date: parseDate(object.date),
        weather: parseWeather(object.weather),
        visibility: parseVisibility(object.visibility)
    };
    return newEntry;
};
exports.default = toNewDiaryEntry;
//# sourceMappingURL=utils.js.map