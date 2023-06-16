"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorAdmin = void 0;
const zod_1 = require("zod");
// schemas for Admin
exports.validatorAdmin = zod_1.z.object({
// id: z.string(),
// admin: z.string(),
// name: z.string().min(3).max(20),
// lastName: z.string().min(3).max(20),
// email: z
//   .string()
//   .regex(
//     /^(?=.{3,35}@.{4,35}$)(?=.{9,72}$)(?!.\\.\\.)(?!^\\.)(?!.\\.$)[a-zA-Z0-9][a-zA-Z0-9.!#$%&\'+/=?^_`{|}~-][a-zA-Z0-9]@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/
//   ),
// password: z.string() // (review hash and cripted for this type)z.string.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#+-*&])[A-Za-z\d$#+-*&]{8,}$/)
});
//# sourceMappingURL=adminSchemas.js.map