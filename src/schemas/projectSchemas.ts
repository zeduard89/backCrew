import { z } from "zod"

export const projectValidator = z.object({
  title: z
    .string()
    .min(3, { message: "The title must have at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "The description must have at least 10 characters" }),
  shortDescription: z.string().min(5, {
    message: "The short description must have at least 5 characters"
  }),
  fundingGoal: z
    .number()
    .positive({ message: "The funding goal must be a positive number" }),
  fundingGoalReached: z.boolean().default(false),
  fundingDayLeft: z.number().positive({
    message: "The remaining funding days must be a positive number"
  }),
  category: z
    .string()
    .min(1, { message: "Please select at least one category" }),
  bank: z
    .string()
    .min(2, { message: "The bank name must have at least 2 characters" })
    .optional(),
  account: z
    .string()
    .min(2, { message: "The account number must have at least 2 characters" })
    .optional(),
  location: z
    .string()
    .min(2, { message: "The location must have at least 2 characters" })
    .default("Argentina"),
  projectFase: z
    .number()
    .nonnegative({ message: "The project phase must be a non-negative number" })
    .max(3)
    .default(0),
  displayProject: z.boolean().default(false),
  creatorId: z.string()
})

export const projectPostValidator = z.object({
  title: z
    .string()
    .min(3, { message: "The title must have at least 3 characters" })
    .optional(),
  description: z
    .string()
    .min(10, { message: "The description must have at least 10 characters" })
    .optional(),
  shortDescription: z.string().min(5, {
    message: "The short description must have at least 5 characters"
  }),
  fundingGoal: z.string().optional(),
  fundingDayLeft: z.string().optional(),
  category: z
    .string()
    .min(1, { message: "Please select at least one category" })
    .optional(),
  creatorId: z.string().optional()
})

export const deleteProjectValidator = z.object({
  id: z.string().min(1, { message: "Id must have at least 1 characters" }),
  displayProject: z.boolean()
})

export const updateProjectValidator = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must have at least 10 characters" }),
  shortDescription: z
    .string()
    .min(5, { message: "Short description must have at least 5 characters" }),
  fundingGoal: z
    .number()
    .positive({ message: "Funding goal must be a positive number" }),
  fundingDayLeft: z
    .number()
    .positive({ message: "Remaining funding days must be a positive number" }),
  category: z
    .string()
    .min(1, { message: "You must select at least one category" }),
  bank: z
    .string()
    .min(2, { message: "Bank name must have at least 2 characters" })
    .default("bank"),
  account: z
    .string()
    .min(2, { message: "Account number must have at least 2 characters" })
    .default("account")
})

export const updateFundingCurrentValidator = z.object({
  id: z.string().min(3, { message: "Id must have at least 3 characters" }),
  addToFundingCurrent: z.number().positive({
    message: "The value to add to current funding must be a positive number"
  })
})

export const updateLikesValidator = z.object({
  id: z.string().min(3, { message: "Id must have at least 3 characters" }),
  likes: z
    .number()
    .nonnegative({ message: "Number of likes must be a non-negative value" }),
  disLikes: z
    .number()
    .nonnegative({ message: "Number of dislikes must be a non-negative value" })
})

export const validatorString = z.string()

export const validatorNumber = z.number()

export const validatorQuerySearch = z.string().nullable()
