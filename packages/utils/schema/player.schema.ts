import { z } from "zod"
import { adjImageSchema } from "./adj.schema"

export const playerSchema = z.object({
  username: z.string().min(1),
  photoURL: z.string(),
  photoAdj: adjImageSchema.optional(),
})

export type PlayerSchema = z.infer<typeof playerSchema>

export const Stat = z
  .object({
    name: z.string(),
    id: z.string(),
    value: z.string().or(z.number()),
    isNum: z.boolean(),
  })
  .refine((data) => {
    const isNumber = typeof data.value === "number" && !!data.isNum
    const isString = typeof data.value === "string" && !data.isNum
    if (isNumber || isString) return true
    return false
  }, "Value should be the string if isNum is false, and value should be a number if isNum is true")

export type StatSchema = z.infer<typeof playerSchema>
