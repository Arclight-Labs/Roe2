import { SocketEvent } from "./SocketEvent.interface"
import { Tournament, Waypoint } from ".."
import { NotificationProps } from "@mantine/notifications"
export type SocketEmitterFn = (...args: any[]) => any
export type SocketEmitterRecord = Record<SocketEvent, SocketEmitterFn>
export type SocketEmitterType = Omit<SocketEmitterRecord, "log">

export type Ping = (date: number) => any | Promise<any>
export type SetTournament = (
  payload: Partial<Waypoint.ApiResHashed>
) => any | Promise<any>
export type JoinRoomProps = {
  roomId: string
  roomName: string
  username: string
}
export type LeaveRoomProps = JoinRoomProps
export type LeaveRoom = (props: LeaveRoomProps) => any | Promise<any>
export type JoinRoom = (props: JoinRoomProps) => any | Promise<any>
export type Notif = (props: NotificationProps) => any | Promise<any>

export interface SocketEmitters extends SocketEmitterType {
  joinRoom: JoinRoom
  leaveRoom: LeaveRoom
  tournament: SetTournament
  ping: Ping
  notif: Notif
}
