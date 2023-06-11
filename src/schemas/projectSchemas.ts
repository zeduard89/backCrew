import { z } from "zod"

export const projectValidator = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  // fundingCurrent: z.number().positive(),
  fundingGoal: z.number().positive(),
  fundingGoalReached: z.boolean(),
  // fundingPercentage: z.number().min(0).max(100),
  fundingDayLeft: z.number().positive(),
  categories: z.array(z.string()).min(1),
  image: z.string().url(),
  displayProject: z.boolean()
})

export const deleteProjectValidator = z.object({
  title: z.string().min(3),
  displayProject: z.boolean()
})

export const updateProjectValidator = z.object({
  id: z.number(),
  title: z.string().min(3),
  description: z.string().min(10),
  fundingGoal: z.number().positive(),
  fundingDayLeft: z.number().positive(),
  categories: z.array(z.string()).min(1)
})

export const updateFundingCurrentValidator = z.object({
  title: z.string().min(3),
  addToFundingCurrent: z.number().positive()
})

export const validatorString = z.string()
