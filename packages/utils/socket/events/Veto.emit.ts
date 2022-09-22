import { SocketEvent } from "interface"
import { SetVetoSettings } from "interface/ws/SocketEmitter.interface"
import { socket } from "../Socket.instance"

export const setVetoSettings: SetVetoSettings =
  (accessToken) => (matchId, data) => {
    socket.emit(SocketEvent.VetoSettings, data, matchId, accessToken)
  }
