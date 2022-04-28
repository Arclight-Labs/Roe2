import { z } from "zod"
export const userCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type UserCreateInfer = z.infer<typeof userCreateSchema>
