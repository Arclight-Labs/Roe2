import { z } from "zod"
export const playerSchema = z.object({
  username: z.string(),
  photoURL: z.string(),
})

export type PlayerSchema = z.infer<typeof playerSchema>
