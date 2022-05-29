import { z } from "zod"
import { adjSizeSchema } from "./adj.schema"

export const statSchema = z.object({
  name: z.string(),
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  value: z.string(),
})

export type StatSchema = z.infer<typeof statSchema>

export const playerSchema = z.object({
  username: z.string().min(1),
  photoURL: z.string(),
  photoAdj: adjSizeSchema.optional(),
  stats: z.array(statSchema).optional(),
})

export type PlayerSchema = z.infer<typeof playerSchema>
