import { z } from "zod"

export const projectValidator = z.object({
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
  shortDescription: z.string().min(5, {
    message: "La descripción corta debe tener al menos 5 caracteres"
  }),
  fundingGoal: z.number().positive({
    message: "La meta de financiamiento debe ser un número positivo"
  }),
  fundingGoalReached: z.boolean().default(false),
  fundingDayLeft: z.number().positive({
    message: "Los días restantes de financiamiento deben ser un número positivo"
  }),
  categories: z
    .array(z.string())
    .min(1, { message: "Debes seleccionar al menos una categoría" }),
  banco: z.string().min(2, {
    message: "El nombre del banco debe tener al menos 2 caracteres"
  }),
  cuenta: z.string().min(2, {
    message: "El número de cuenta debe tener al menos 2 caracteres"
  }),
  pais: z.string().min(2, {
    message: "El número de cuenta debe tener al menos 2 caracteres"
  }),
  projectFase: z
    .number()
    .nonnegative({
      message: "La meta de financiamiento debe ser un número positivo"
    })
    .max(3)
    .default(0),
  displayProject: z.boolean().default(false)
})

export const deleteProjectValidator = z.object({
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),
  displayProject: z.boolean()
})

export const updateProjectValidator = z.object({
  id: z.number(),
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
  shortDescription: z.string().min(5, {
    message: "La descripción corta debe tener al menos 5 caracteres"
  }),
  fundingGoal: z.number().positive({
    message: "La meta de financiamiento debe ser un número positivo"
  }),
  fundingDayLeft: z.number().positive({
    message: "Los días restantes de financiamiento deben ser un número positivo"
  }),
  categories: z
    .array(z.string())
    .min(1, { message: "Debes seleccionar al menos una categoría" }),
  banco: z.string().min(2, {
    message: "El nombre del banco debe tener al menos 2 caracteres"
  }),
  cuenta: z
    .string()
    .min(2, { message: "El número de cuenta debe tener al menos 2 caracteres" })
})

export const updateFundingCurrentValidator = z.object({
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),
  addToFundingCurrent: z.number().positive({
    message:
      "El valor a agregar al financiamiento actual debe ser un número positivo"
  })
})

export const updateLikesValidator = z.object({
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),
  likes: z.number().nonnegative({
    message: "El número de 'likes' debe ser un valor no negativo"
  }),
  disLikes: z.number().nonnegative({
    message: "El número de 'dislikes' debe ser un valor no negativo"
  })
})

export const validatorString = z.string()

export const validatorNumber = z.number()
