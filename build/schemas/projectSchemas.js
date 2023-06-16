"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorNumber = exports.validatorString = exports.updateLikesValidator = exports.updateFundingCurrentValidator = exports.updateProjectValidator = exports.deleteProjectValidator = exports.projectValidator = void 0;
const zod_1 = require("zod");
exports.projectValidator = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, { message: "El título debe tener al menos 3 caracteres" }),
    description: zod_1.z
        .string()
        .min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
    shortDescription: zod_1.z.string().min(5, {
        message: "La descripción corta debe tener al menos 5 caracteres"
    }),
    fundingGoal: zod_1.z.number().positive({
        message: "La meta de financiamiento debe ser un número positivo"
    }),
    fundingGoalReached: zod_1.z.boolean().default(false),
    fundingDayLeft: zod_1.z.number().positive({
        message: "Los días restantes de financiamiento deben ser un número positivo"
    }),
    category: zod_1.z
        .string()
        .min(1, { message: "Debes seleccionar al menos una categoría" }),
    bank: zod_1.z
        .string()
        .min(2, {
        message: "El nombre del banco debe tener al menos 2 caracteres"
    })
        .optional(),
    account: zod_1.z
        .string()
        .min(2, {
        message: "El número de cuenta debe tener al menos 2 caracteres"
    })
        .optional(),
    location: zod_1.z
        .string()
        .min(2, {
        message: "El número de cuenta debe tener al menos 2 caracteres"
    })
        .default("Argentina"),
    projectFase: zod_1.z
        .number()
        .nonnegative({
        message: "La meta de financiamiento debe ser un número positivo"
    })
        .max(3)
        .default(0),
    displayProject: zod_1.z.boolean().default(false)
});
exports.deleteProjectValidator = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, { message: "El título debe tener al menos 3 caracteres" }),
    displayProject: zod_1.z.boolean()
});
exports.updateProjectValidator = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z
        .string()
        .min(3, { message: "El título debe tener al menos 3 caracteres" }),
    description: zod_1.z
        .string()
        .min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
    shortDescription: zod_1.z.string().min(5, {
        message: "La descripción corta debe tener al menos 5 caracteres"
    }),
    fundingGoal: zod_1.z.number().positive({
        message: "La meta de financiamiento debe ser un número positivo"
    }),
    fundingDayLeft: zod_1.z.number().positive({
        message: "Los días restantes de financiamiento deben ser un número positivo"
    }),
    category: zod_1.z
        .string()
        .min(1, { message: "Debes seleccionar al menos una categoría" }),
    bank: zod_1.z.string().min(2, {
        message: "El nombre del banco debe tener al menos 2 caracteres"
    }),
    account: zod_1.z
        .string()
        .min(2, { message: "El número de cuenta debe tener al menos 2 caracteres" })
});
exports.updateFundingCurrentValidator = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, { message: "El título debe tener al menos 3 caracteres" }),
    addToFundingCurrent: zod_1.z.number().positive({
        message: "El valor a agregar al financiamiento actual debe ser un número positivo"
    })
});
exports.updateLikesValidator = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, { message: "El título debe tener al menos 3 caracteres" }),
    likes: zod_1.z.number().nonnegative({
        message: "El número de 'likes' debe ser un valor no negativo"
    }),
    disLikes: zod_1.z.number().nonnegative({
        message: "El número de 'dislikes' debe ser un valor no negativo"
    })
});
exports.validatorString = zod_1.z.string();
exports.validatorNumber = zod_1.z.number();
//# sourceMappingURL=projectSchemas.js.map