import { SocketEvent } from "interface"
import {
  SetVetoSettings,
  VetoClaimCoin,
  VetoJoin,
} from "interface/ws/SocketEmitter.interface"
import { socket } from "../Socket.instance"

export const setVetoSettings: SetVetoSettings =
  (accessToken) => (matchId, data) => {
    socket.emit(SocketEvent.VetoSettings, data, matchId, accessToken)
  }

export const vetoJoin: VetoJoin = (accessToken) => (matchId, data) => {
  socket.emit(SocketEvent.VetoJoin, data, matchId, accessToken)
}

export const vetoClaimCoin: VetoClaimCoin =
  (accessToken) => (matchId, data) => {
    socket.emit(SocketEvent.VetoClaimCoin, data, matchId, accessToken)
  }
