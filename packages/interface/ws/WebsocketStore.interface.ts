import { Waypoint } from ".."
import { Room, User } from "../db"
import { SanitizedParticipantMap, SanitizedSeriesMap } from "../waypoint"

export interface WebsocketStore {
  rooms: Record<string, WebsocketRoom>
}

export interface BroadcastData {
  tournament: Waypoint.Tournament | null
  matches: SanitizedSeriesMap
  participants: SanitizedParticipantMap
  talents: Record<string, User>
}

export type WebsocketRoom = Room & BroadcastData
