import { SocketEvent } from "./SocketEvent"
import { Tournament } from "../"
export type SocketEmitter = (...args: any[]) => any
export type SocketEmitterType = Record<SocketEvent, SocketEmitter>

type Ping = (date: number) => void
type SetTournament = (payload: Partial<Tournament>) => void

export interface SocketEmitters extends SocketEmitterType {
  tournament: SetTournament
  ping: Ping
}
