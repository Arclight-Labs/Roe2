import { SocketEvent } from "interface"
import { WebsocketRoom } from "interface/ws"
import { Socket } from "socket.io"

type RoomDataEmit = (socket: Socket, data: WebsocketRoom) => void

export const roomDataEmit: RoomDataEmit = (socket, data) => {
  const { tournament, matches, participants, ...others } = data

  /**
   * There are other way to omit the properties from the object
   * but I didn't want to use lodash or any other library
   * to do this.
   *
   * Codefactor is complaining about the destructuring
   */
  const live = others as Partial<WebsocketRoom>
  delete live.admins
  delete live.avatar
  delete live.id
  delete live.name
  delete live.owner
  delete live.roomId
  delete live.uniqueCode

  socket.emit(SocketEvent.Tournament, tournament)
  socket.emit(SocketEvent.Matches, matches)
  socket.emit(SocketEvent.Participants, participants)
  socket.emit(SocketEvent.SetLive, live)
}
