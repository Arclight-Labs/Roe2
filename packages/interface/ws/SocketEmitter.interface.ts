import { NotificationProps } from "@mantine/notifications"
import { Waypoint } from "../"
import {
  SanitizedParticipant,
  SanitizedParticipantMap,
  SanitizedSeries,
  SanitizedSeriesMap,
} from "../waypoint"
import { Live } from "./Live.interface"
import { SocketEvent } from "./SocketEvent.interface"
import { WebsocketRoom } from "./WebsocketStore.interface"
export type SocketEmitterFn = Function
export type SocketEmitterRecord = Record<SocketEvent, SocketEmitterFn>
export type SocketEmitterType = Omit<SocketEmitterRecord, "log">

export type Ping = (date: number) => void
export type SetMatches = (
  accessToken: string
) => (payload: SanitizedSeriesMap) => void
export type SetMatch = (
  accessToken: string
) => (matchId: string, data: Partial<SanitizedSeries>) => void
export type SetParticipants = (
  accessToken: string
) => (payload: SanitizedParticipantMap) => void
export type SetPariticipant = (
  accessToken: string
) => (teamId: string, payload: Partial<SanitizedParticipant>) => void
export type SetTournament = (
  accessToken: string
) => (payload: Partial<Waypoint.Tournament>) => void
export type SetLive = (accessToken: string) => (payload: Partial<Live>) => void

export type JoinRoomProps = {
  roomId: string
  roomName: string
  username: string
}
export type LeaveRoomProps = JoinRoomProps
export type LeaveRoom = (props: LeaveRoomProps) => void
export type JoinRoom = (props: JoinRoomProps) => void
export type Notif = (accessToken: string) => (props: NotificationProps) => void
export type SetRoom = (
  accessToken: string
) => (room: Partial<WebsocketRoom> & { id: string }) => void

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
