import { z } from "zod"
export const rundownSchema = z.object({
  name: z.string(),
  desc: z.string(),
  image: z.string(),
})

export const rundownColumnSchema = z.object({
  name: z.string().min(1),
})

export const rundownFlowItemSchema = z.object({
  title: z.string().min(1),
  desc: z.string(),
  matchId: z.string(),
  columns: z.record(z.string()),
})

export const rundownCalloutSchema = z.object({
  text: z.string(),
  icon: z.string(),
  live: z.boolean(),
  textColor: z.string(),
  backgroundColor: z.string(),
})

export type RundownSchema = z.infer<typeof rundownSchema>
export type RundownColumnSchema = z.infer<typeof rundownColumnSchema>
export type RundownFlowItemSchema = z.infer<typeof rundownFlowItemSchema>
export type RundownCalloutSchema = z.infer<typeof rundownCalloutSchema>
