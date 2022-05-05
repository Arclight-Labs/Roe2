import { SocketEvent } from "./SocketEvent.interface"
import { Tournament } from ".."
import { NotificationProps } from "@mantine/notifications"
import { WithAuth } from "../utils"
export type SocketEmitter = (...args: any[]) => any
export type SocketEmitterType = Record<SocketEvent, SocketEmitter>

export type Ping = (date: number) => any | Promise<any>
export type SetTournament = (payload: Partial<Tournament>) => any | Promise<any>
export type JoinRoomProps = { roomId: string; uid: string }
export type JoinRoom = (props: JoinRoomProps) => any | Promise<any>
export type Notif = (props: NotificationProps) => any | Promise<any>

export interface SocketEmitters extends SocketEmitterType {
  joinRoom: JoinRoom
  tournament: SetTournament
  ping: Ping
  notif: Notif
}
