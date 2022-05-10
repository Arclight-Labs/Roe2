import { z } from "zod"
export const playerSchema = z.object({
  username: z.string().min(1),
  photoURL: z.string(),
})

export type PlayerSchema = z.infer<typeof playerSchema>
