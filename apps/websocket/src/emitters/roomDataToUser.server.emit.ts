import { WebsocketRoom } from "interface/ws"
import { SocketEvent } from "interface"
import { Socket } from "socket.io"

type RoomDataEmit = (socket: Socket, data: WebsocketRoom) => void

export const roomDataEmit: RoomDataEmit = (socket, data) => {
  socket.emit(SocketEvent.Tournament, data.tournament)
  socket.emit(SocketEvent.Matches, data.matches)
  socket.emit(SocketEvent.Participants, data.participants)
}
