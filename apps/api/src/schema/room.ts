import { z } from "zod"
export const roomUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  tournament: z.string().optional(),
})
