import { SocketEvent } from "./SocketEvent.interface"
import { Waypoint } from "../"
import { NotificationProps } from "@mantine/notifications"
import {
  SanitizedParticipant,
  SanitizedParticipantMap,
  SanitizedSeries,
  SanitizedSeriesMap,
} from "../waypoint"
import { Live } from "./Live.interface"
import { WebsocketRoom } from "./WebsocketStore.interface"
export type SocketEmitterFn = Function
export type SocketEmitterRecord = Record<SocketEvent, SocketEmitterFn>
export type SocketEmitterType = Omit<SocketEmitterRecord, "log">

export type Ping = (date: number) => void
export type SetMatches = (payload: SanitizedSeriesMap) => void
export type SetMatch = (matchId: string, data: Partial<SanitizedSeries>) => void
export type SetParticipants = (payload: SanitizedParticipantMap) => void
export type SetPariticipant = (
  teamId: string,
  payload: Partial<SanitizedParticipant>
) => void
export type SetTournament = (payload: Partial<Waypoint.Tournament>) => void
export type SetLive = (payload: Partial<Live>) => void

export type JoinRoomProps = {
  roomId: string
  roomName: string
  username: string
}
export type LeaveRoomProps = JoinRoomProps
export type LeaveRoom = (props: LeaveRoomProps) => void
export type JoinRoom = (props: JoinRoomProps) => void
export type Notif = (props: NotificationProps) => void
export type SetRoom = (room: Partial<WebsocketRoom> & { id: string }) => void

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
