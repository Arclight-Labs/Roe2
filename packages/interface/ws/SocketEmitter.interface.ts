import { SocketEvent } from "./SocketEvent.interface"
import { Waypoint } from "../"
import { NotificationProps } from "@mantine/notifications"
import {
  SanitizedParticipant,
  SanitizedParticipantMap,
  SanitizedSeries,
  SanitizedSeriesMap,
} from "../waypoint"
import { Live, WebsocketRoom } from "./WebsocketStore.interface"
export type SocketEmitterFn = (...args: any[]) => any
export type SocketEmitterRecord = Record<SocketEvent, SocketEmitterFn>
export type SocketEmitterType = Omit<SocketEmitterRecord, "log">

export type Ping = (date: number) => any
export type SetMatches = (payload: SanitizedSeriesMap) => any
export type SetMatch = (matchId: string, data: Partial<SanitizedSeries>) => any
export type SetParticipants = (payload: SanitizedParticipantMap) => any
export type SetPariticipant = (
  teamId: string,
  payload: Partial<SanitizedParticipant>
) => any
export type SetTournament = (payload: Partial<Waypoint.Tournament>) => any
export type SetLive = (payload: Partial<Live>) => any

export type JoinRoomProps = {
  roomId: string
  roomName: string
  username: string
}
export type LeaveRoomProps = JoinRoomProps
export type LeaveRoom = (props: LeaveRoomProps) => any
export type JoinRoom = (props: JoinRoomProps) => any
export type Notif = (props: NotificationProps) => any
export type SetRoom = (room: Partial<WebsocketRoom> & { id: string }) => any

export interface SocketEmitters extends SocketEmitterType {
  joinRoom: JoinRoom
  leaveRoom: LeaveRoom
  tournament: SetTournament
  ping: Ping
  notif: Notif
  matches: SetMatches
  participants: SetParticipants
  setRoom: SetRoom
  setParticipant: SetPariticipant
  setLive: SetLive
}
