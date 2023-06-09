"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDiary = exports.getEntriesWithouSensitiveInfo = exports.findById = exports.getEntries = void 0;
const diaries_json_1 = __importDefault(require("./diaries.json"));
//  creo diaries , que es un Array de tipo DiaryEntry(del tipo OBJ que cree), que lo traigo de diaryData
//! Utilizo Asercion de tipos, como el jason puede tener cualquier variable, le AFIRMO que es como lo indico
//! en este caso suscede que Wether lo quiere ver como un string y no es asi (evitar usar esto)
const diaries = diaries_json_1.default;
const getEntries = () => diaries;
exports.getEntries = getEntries;
const findById = (id) => {
    const entry = diaries.find(d => d.id === id);
    if (entry != null) {
        const { comment } = entry, restOfDiary = __rest(entry, ["comment"]);
        return restOfDiary;
    }
    return undefined;
};
exports.findById = findById;
const getEntriesWithouSensitiveInfo = () => {
    // getEntriesWithouSensitiveInfo, devuelve un objeto sin comment, pero TC no lo detecta en entorno dinamico
    // TC entiende en estatico lo que tiene, pero al retornar algo dinamico, necesitamos recuperarlo nosotros por eso el MAP
    return diaries.map(({ id, date, weather, visibility }) => {
        return {
            id,
            date,
            weather,
            visibility
        };
    });
};
exports.getEntriesWithouSensitiveInfo = getEntriesWithouSensitiveInfo;
const addDiary = (newDiaryEntry) => {
    const newDiary = Object.assign({ id: Math.max(...diaries.map(d => d.id)) + 1 }, newDiaryEntry);
    diaries.push(newDiary);
    return newDiary;
};
exports.addDiary = addDiary;
//# sourceMappingURL=diaryServices.js.map