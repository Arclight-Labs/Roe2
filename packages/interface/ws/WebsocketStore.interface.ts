import { Waypoint } from ".."
import { Room } from "../db"
import {
  SanitizedParticipantHashMap,
  SanitizedSeriesHashMap,
} from "../waypoint"

export interface WebsocketStore {
  rooms: Map<string, WebsocketRoom>
}

export interface WebsocketRoom extends Room {
  tournament: Waypoint.Tournament | null
  matches: SanitizedSeriesHashMap
  participants: SanitizedParticipantHashMap
}
