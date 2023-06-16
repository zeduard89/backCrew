import { z } from "zod"

// schemas for Admin
export const validatorAdmin = z.object({
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
})
