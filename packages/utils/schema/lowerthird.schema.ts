import { z } from "zod"
import { adjImageSchema, adjTextSchema } from "./adj.schema"
// --------

export const tickerSchema = z.object({
  headline: adjTextSchema,
  scrollerText: adjTextSchema,
})

export const adSchema = z.object({
  headline: adjTextSchema,
  body: adjTextSchema,
  image: adjImageSchema,
  priority: z.number().optional(),
})

export const adPoolSchema = z.object({
  ads: z.array(adSchema),
  transitionDuration: z.number().default(300),
  duration: z.number().default(5000),
})

export const matchPollItem = z.object({
  teamId: z.string(),
  vote: z.number(),
})

export const matchPollSchema = z.object({
  a: matchPollItem,
  b: matchPollItem,
})

export const shoutoutSchema = z.object({
  alias: z.string(),
  message: z.string(),
  image: z.string(),
  avatar: z.string(),
})

export const lowerthirdSchema = z.object({
  show: z.boolean(),
  data: z.object({
    ticker: tickerSchema,
    ad: adSchema,
    adPool: adPoolSchema,
    matchPoll: matchPollSchema,
  }),
  mode: z.enum(["ticker", "ad", "adPool", "matchPoll"]),
})

export type TickerSchema = z.infer<typeof tickerSchema>
export type AdSchema = z.infer<typeof adSchema>
export type AdPoolSchema = z.infer<typeof adPoolSchema>
export type MatchPollSchema = z.infer<typeof matchPollSchema>
export type ShoutoutSchema = z.infer<typeof shoutoutSchema>
