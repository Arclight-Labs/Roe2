import { z } from "zod"
export const roomCreateSchema = z.object({
  name: z.string().min(3, "name must be at least 3 characters"),
  avatar: z.string(),
  admins: z.array(z.string()),
  uniqueCode: z.string().optional(),
})

export type RoomCreateSchema = z.infer<typeof roomCreateSchema>
