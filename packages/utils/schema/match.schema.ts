import { z } from "zod"

export const matchSchema = z.object({
  teamA: z.number().nullable(),
  teamB: z.number().nullable(),
  scores: z.array(z.string().regex(/[0-9]+-[0-9]+/)),
  winnerId: z.number().nullable(),
  bestOf: z.number().min(1).default(1).optional(),
})

export type MatchSchema = z.infer<typeof matchSchema>
