import { Live } from "./Live.interface"
import { Waypoint } from ".."
import { Room } from "../db"
import { SanitizedParticipantMap, SanitizedSeriesMap } from "../waypoint"

export interface WebsocketStore {
  rooms: Record<string, WebsocketRoom>
}
export interface Broadcast extends Partial<Live> {
  tournament: Waypoint.Tournament | null
  matches: SanitizedSeriesMap
  participants: SanitizedParticipantMap
  roomId: string
}
interface Listeners {
  listeners: Record<string, string>
}
export type WebsocketRoom = Room & Listeners & Broadcast
