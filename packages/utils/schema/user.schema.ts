import { z } from "zod"
export const userCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
export type UserCreateInfer = z.infer<typeof userCreateSchema>

export const userUpdateSchema = z.object({
  username: z.string().min(1),
  socialHandle: z.string().min(3),
  avatar: z.string().optional(),
  isTalent: z.boolean(),
})

export type UserUpdate = z.infer<typeof userUpdateSchema>
