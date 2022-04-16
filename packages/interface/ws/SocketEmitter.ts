import { SocketEvent } from "./SocketEvent"
import { Tournament } from "../"
export type SocketEmitter = (...args: any[]) => any
export type SocketEmitterType = Record<SocketEvent, SocketEmitter>

type Ping = (date: number) => void
type SetTournament = (payload: Partial<Tournament>) => void
type JoinRoom = (payload: { username: string; password: string }) => void

export interface SocketEmitters extends SocketEmitterType {
  joinRoom: JoinRoom
  tournament: SetTournament
  ping: Ping
}
