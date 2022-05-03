import { z } from "zod"
export const userCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
})
export type UserCreateInfer = z.infer<typeof userCreateSchema>

export const userUpdateSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  socialHandle: z
    .string()
    .min(3, "Social Handle must be at least 3 characters"),
  avatar: z.string().optional(),
  isTalent: z.boolean(),
})

export type UserUpdate = z.infer<typeof userUpdateSchema>
