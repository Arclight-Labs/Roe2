import { NotificationProps } from "@mantine/notifications"
import {
  VetoClaimCoin as VetoClaimCoinSchema,
  VetoMapPick as VetoMapPickSchema,
  VetoReady as VetoJoinSchema,
  VetoSidePick as VetoSidePickSchema,
} from "utils/schema/veto.schema"
import { Waypoint } from "../"
import { VetoSettings } from "../db"
import {
  SanitizedParticipant,
  SanitizedParticipantMap,
  SanitizedSeries,
  SanitizedSeriesMap,
} from "../waypoint"
import { Live } from "./Live.interface"
import { SocketEvent } from "./SocketEvent.interface"
import { WebsocketRoom } from "./WebsocketStore.interface"
export type SocketEmitterFn = CallableFunction
export type SocketEmitterRecord = Record<SocketEvent, SocketEmitterFn>
export type SocketEmitterType = Omit<SocketEmitterRecord, "log">

export type Ping = (date: number) => void

// Matches
export type SetMatches = (
  accessToken: string
) => (payload: SanitizedSeriesMap) => void
export type SetMatch = (
  accessToken: string
) => (matchId: string, data: Partial<SanitizedSeries>) => void

// Veto
export type SetVetoSettings = (
  accessToken: string
) => (matchId: string, data: Partial<VetoSettings>) => void

export type VetoReady = (
  accessToken: string
) => (matchId: string, data: VetoJoinSchema) => void

export type VetoClaimCoin = (
  accessToken: string
) => (matchId: string, data: VetoClaimCoinSchema) => void

export type VetoReset = (accessToken: string) => (matchId: string) => void

export type VetoMapPick = (
  accessToken: string
) => (data: VetoMapPickSchema) => void

export type VetoSidePick = (
  accessToken: string
) => (data: VetoSidePickSchema) => void

// Participants
export type SetParticipants = (
  accessToken: string
) => (payload: SanitizedParticipantMap) => void
export type SetPariticipant = (
  accessToken: string
) => (teamId: string, payload: Partial<SanitizedParticipant>) => void

// Tournament
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
  vetoSettings: SetVetoSettings
  vetoReady: VetoReady
  vetoReset: VetoReset
  vetoClaimCoin: VetoClaimCoin
  vetoMapPick: VetoMapPick
  vetoSidePick: VetoSidePick
}
