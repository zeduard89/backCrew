"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorQuerySearch = exports.validatorNumber = exports.validatorString = exports.updateLikesValidator = exports.updateFundingCurrentValidator = exports.updateProjectValidator = exports.deleteProjectValidator = exports.projectValidator = void 0;
const zod_1 = require("zod");
exports.projectValidator = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, { message: "The title must have at least 3 characters" }),
    description: zod_1.z
        .string()
        .min(10, { message: "The description must have at least 10 characters" }),
    shortDescription: zod_1.z.string().min(5, {
        message: "The short description must have at least 5 characters"
    }),
    fundingGoal: zod_1.z
        .number()
        .positive({ message: "The funding goal must be a positive number" }),
    fundingGoalReached: zod_1.z.boolean().default(false),
    fundingDayLeft: zod_1.z.number().positive({
        message: "The remaining funding days must be a positive number"
    }),
    category: zod_1.z
        .string()
        .min(1, { message: "Please select at least one category" }),
    bank: zod_1.z
        .string()
        .min(2, { message: "The bank name must have at least 2 characters" })
        .optional(),
    account: zod_1.z
        .string()
        .min(2, { message: "The account number must have at least 2 characters" })
        .optional(),
    location: zod_1.z
        .string()
        .min(2, { message: "The location must have at least 2 characters" })
        .default("Argentina"),
    projectFase: zod_1.z
        .number()
        .nonnegative({ message: "The project phase must be a non-negative number" })
        .max(3)
        .default(0),
    displayProject: zod_1.z.boolean().default(false),
    creatorId: zod_1.z.string()
});
exports.deleteProjectValidator = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, { message: "Title must have at least 3 characters" }),
    displayProject: zod_1.z.boolean()
});
exports.updateProjectValidator = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z
        .string()
        .min(3, { message: "Title must have at least 3 characters" }),
    description: zod_1.z
        .string()
        .min(10, { message: "Description must have at least 10 characters" }),
    shortDescription: zod_1.z
        .string()
        .min(5, { message: "Short description must have at least 5 characters" }),
    fundingGoal: zod_1.z
        .number()
        .positive({ message: "Funding goal must be a positive number" }),
    fundingDayLeft: zod_1.z
        .number()
        .positive({ message: "Remaining funding days must be a positive number" }),
    category: zod_1.z
        .string()
        .min(1, { message: "You must select at least one category" }),
    bank: zod_1.z
        .string()
        .min(2, { message: "Bank name must have at least 2 characters" })
        .default("bank"),
    account: zod_1.z
        .string()
        .min(2, { message: "Account number must have at least 2 characters" })
        .default("account")
});
exports.updateFundingCurrentValidator = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, { message: "Title must have at least 3 characters" }),
    addToFundingCurrent: zod_1.z.number().positive({
        message: "The value to add to current funding must be a positive number"
    })
});
exports.updateLikesValidator = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, { message: "Title must have at least 3 characters" }),
    likes: zod_1.z
        .number()
        .nonnegative({ message: "Number of likes must be a non-negative value" }),
    disLikes: zod_1.z
        .number()
        .nonnegative({ message: "Number of dislikes must be a non-negative value" })
});
exports.validatorString = zod_1.z.string();
exports.validatorNumber = zod_1.z.number();
exports.validatorQuerySearch = zod_1.z.string().nullable();
//# sourceMappingURL=projectSchemas.js.map