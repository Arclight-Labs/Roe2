import { z } from "zod"
export const roomUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  tournament: z.string().optional(),
})

export type RoomUpdateSchema = z.infer<typeof roomUpdateSchema>

export const roomCreateSchema = z.object({
  name: z.string().min(3, "name must be at least 3 characters"),
  avatar: z.string(),
  admins: z.array(z.string()),
})

export type RoomCreateSchema = z.infer<typeof roomCreateSchema>
