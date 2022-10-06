import { SocketEvent } from "interface"
import {
  SetVetoSettings,
  VetoClaimCoin,
  VetoMapPick,
  VetoReady,
  VetoReset,
  VetoSidePick,
} from "interface/ws/SocketEmitter.interface"
import { socket } from "../Socket.instance"

export const setVetoSettings: SetVetoSettings =
  (accessToken) => (matchId, data) => {
    socket.emit(SocketEvent.VetoSettings, data, matchId, accessToken)
  }

export const vetoReady: VetoReady = (accessToken) => (matchId, data) => {
  socket.emit(SocketEvent.vetoReady, data, matchId, accessToken)
}

export const vetoClaimCoin: VetoClaimCoin =
  (accessToken) => (matchId, data) => {
    socket.emit(SocketEvent.VetoClaimCoin, data, matchId, accessToken)
  }

export const vetoReset: VetoReset = (accessToken) => (seriesId) => {
  socket.emit(SocketEvent.VetoReset, seriesId, accessToken)
}

export const vetoMapPick: VetoMapPick = (accessToken) => (data) => {
  socket.emit(SocketEvent.VetoMapPick, data, accessToken)
}

export const vetoSidePick: VetoSidePick = (accessToken) => (data) => {
  socket.emit(SocketEvent.VetoSidePick, data, accessToken)
}
