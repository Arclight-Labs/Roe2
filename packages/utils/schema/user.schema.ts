import { z } from "zod"
export const userCreateSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  avatar: z.string().nullable().optional(),
})

export type UserCreateInfer = z.infer<typeof userCreateSchema>
