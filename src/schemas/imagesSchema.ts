import { z } from "zod"

export const validatorImage = z.object({
  projectId: z.string(),
  name: z.string(),
  url: z.string()
})
