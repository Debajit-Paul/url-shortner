import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message:
        "Minimum eight characters, at least one letter, one number and one special character",
    }),
});
const signUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message:
        "Minimum eight characters, at least one letter, one number and one special character",
    }),
});
const urlSchema = z.object({
  url: z.string().url(),
});
export { signInSchema, signUpSchema, urlSchema };
