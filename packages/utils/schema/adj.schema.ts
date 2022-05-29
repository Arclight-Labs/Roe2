import { z } from "zod"

export const adjTextSchema = z.object({
  text: z.string(),
  size: z.number().default(0),
})

export const adjSizeSchema = z.object({
  h: z.number().default(0),
  w: z.number().default(0),
  x: z.number().default(0),
  y: z.number().default(0),
  scale: z.number().default(0),
})

export const adjImageSchema = z.object({
  URL: z.string(),
  BASE64: z.string().optional(),
  adj: adjSizeSchema,
})
