import { z } from "zod"

export const validatorCommentUserToProject = z.object({
  userId: z.string(),
  projectId: z.string(),
  name: z.string(),
  description: z.string().min(10)
})

export const validatorCommentUserToUser = z.object({
  name: z.string(),
  description: z.string().min(10),
  userId: z.string(),
  projectId: z.string(),
  parentId: z.number().positive()
})
