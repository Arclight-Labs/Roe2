import { SocketEvent } from "interface"
import { WebsocketRoom } from "interface/ws"
import { Socket } from "socket.io"

type RoomDataEmit = (socket: Socket, data: WebsocketRoom) => void

export const roomDataEmit: RoomDataEmit = (socket, data) => {
  const { tournament, matches, participants, ...others } = data
  const { admins, avatar, id, name, owner, roomId, uniqueCode, ...live } =
    others
  socket.emit(SocketEvent.Tournament, tournament)
  socket.emit(SocketEvent.Matches, matches)
  socket.emit(SocketEvent.Participants, participants)
  socket.emit(SocketEvent.SetLive, live)
}
