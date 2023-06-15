import { z } from "zod"

export const validatorComment = z.object({
  id: z.number().positive(),
  firstName: z.string().min(5),
  comments: z.string().min(10),
  likes: z.number().positive(),
  dislikes: z.number().positive(),
  date: z.string().datetime(),
  displayComment: z.boolean()
})
