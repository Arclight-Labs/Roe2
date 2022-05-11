import { z } from "zod"

export const matchSchema = z.object({
  teamA: z.number().nullable(),
  teamB: z.number().nullable(),
  scores: z.array(z.string().regex(/[0-9]+-[0-9]+/)),
  winnerId: z.number().nullable(),
})

export type MatchSchema = z.infer<typeof matchSchema>
