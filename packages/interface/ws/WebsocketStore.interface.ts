import { Waypoint } from ".."
import { Room, User } from "../db"
import {
  SanitizedParticipantHashMap,
  SanitizedParticipantMap,
  SanitizedSeriesHashMap,
  SanitizedSeriesMap,
} from "../waypoint"

export interface WebsocketStore {
  rooms: Map<string, WebsocketRoom>
}

export interface BroadcastData {
  tournament: Waypoint.Tournament | null
  matches: SanitizedSeriesHashMap
  participants: SanitizedParticipantHashMap
  talents: Map<string, User>
}
export interface SanitizedBroadcastData {
  tournament: Waypoint.Tournament | null
  matches: SanitizedSeriesMap
  participants: SanitizedParticipantMap
  talents: Record<string, User>
}

export type WebsocketRoom = Room & BroadcastData
export type SanitizedWebsocketRoom = Room & SanitizedBroadcastData
