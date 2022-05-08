import { Waypoint } from ".."
import { Room, User } from "../db"
import { SanitizedParticipantMap, SanitizedSeriesMap } from "../waypoint"

export interface WebsocketStore {
  rooms: Record<string, WebsocketRoom>
}
export interface Broadcast extends Partial<Live> {
  tournament: Waypoint.Tournament | null
  matches: SanitizedSeriesMap
  participants: SanitizedParticipantMap
  talents: Record<string, User>
  roomId: string
}
interface Listeners {
  listeners: Record<string, string>
}
export type WebsocketRoom = Room & Listeners & Broadcast

export interface ScheduleItem {
  matchId: string
  schedule: Date
}

export interface Live {
  activeMatch: string
  prevMatches: string[]
  nextMatch: string
  schedule: ScheduleItem[]
}