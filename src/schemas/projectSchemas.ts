import { z } from "zod"

export const projectValidator = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  fundingCurrent: z.number().positive(),
  fundingGoal: z.number().positive(),
  fundingGoalReached: z.boolean(),
  fundingPercentage: z.number().min(0).max(100),
  fundingDayLeft: z.number().positive(),
  categories: z.array(z.string()).min(1),
  image: z.string().url()
})

export const creatorValidator = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  avatar: z.string().min(3)
})

export const validatorUUID = z.string().uuid()
