import { z } from "zod";

export const validatorCountry = z.string().min(1).max(25).nullable().optional();

export const validatorCity = z.string().min(1).max(25).nullable().optional();

export const validatorPostalCode = z.string().max(12).refine(value => /^\d{1,12}$/.test(value), {
  message: "Postal code must contain only numeric characters and have a maximum length of 12."
}).nullable().optional();

export const validatorShortDescription = z.string().min(1).max(50).nullable().optional();

export const validatorAboutMe = z.string().min(1).max(500).nullable().optional();
