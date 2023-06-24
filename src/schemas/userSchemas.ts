import { z } from "zod";

export const validatorCountry = z.string().min(1).max(25);

export const validatorCity = z.string().min(1).max(25);

export const validatorPostalCode = z.string().max(12).refine(value => /^\d{1,12}$/.test(value), {
  message: "Postal code must contain only numeric characters and have a maximum length of 12."
});

export const validatorShortDescription = z.string().min(1).max(50);

export const validatorAboutMe = z.string().min(1).max(500);