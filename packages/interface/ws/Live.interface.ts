import { User } from "../db"

export type Schedule = { matchId: string; date: Date }
export type Lowerthird = {}
export interface Live {
  activeMatch: string
  prevMatches: string[]
  nextMatch: string
  schedule: Schedule[]
  invert: boolean
  talents: Record<string, User>
  lt: Lowerthird
}
