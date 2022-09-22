import { Waypoint } from ".."
import { Room } from "../db"
import { SanitizedParticipantMap, SanitizedSeriesMap } from "../waypoint"
import { Live } from "./Live.interface"

export interface WebsocketStore {
  rooms: Record<string, WebsocketRoom>
}
export interface Broadcast extends Partial<Live> {
  tournament: Waypoint.Tournament | null
  matches: SanitizedSeriesMap
  participants: SanitizedParticipantMap
  roomId: string
}
export type WebsocketRoom = Room & Broadcast
