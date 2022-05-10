import { z } from "zod"
export const participantSchema = z.object({
  name: z.string().min(1),
  shortname: z.string(),
  shortcode: z.string(),
  schoolShortcode: z.string(),
  school: z.string(),
  logo: z.string(),
})

export type ParticipantSchema = z.infer<typeof participantSchema>
