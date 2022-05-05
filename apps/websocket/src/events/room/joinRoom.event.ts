import { JoinRoom, NotifProps, SocketEvent } from "interface"
import { EventFn } from "../event.hoc"

export const joinRoomEvent: EventFn<JoinRoom> = (socket, io) => {
  return async ({ roomId, roomName, username }) => {
    socket.join(roomId)
    const log = `${username}:${socket.id} joined room ${roomName}`
    console.log(log)
    io.to(roomId).emit(SocketEvent.Log, log)
  }
}
