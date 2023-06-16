"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorComment = void 0;
const zod_1 = require("zod");
exports.validatorComment = zod_1.z.object({
    id: zod_1.z.number().positive(),
    firstName: zod_1.z.string().min(5),
    comments: zod_1.z.string().min(10),
    likes: zod_1.z.number().positive(),
    dislikes: zod_1.z.number().positive(),
    date: zod_1.z.string().datetime(),
    displayComment: zod_1.z.boolean()
});
//# sourceMappingURL=commentSchema.js.map