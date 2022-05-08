import { JoinRoom, SocketEvent } from "interface"
import { roomDataEmit } from "../../emitters"
import { getRoom } from "../../store"
import { EventFn } from "../event.hoc"

export const joinRoomEvent: EventFn<JoinRoom> = (socket, io) => {
  return async ({ roomId, roomName, username }) => {
    const room = getRoom(roomId)
    if (!room) {
      socket.emit(SocketEvent.Notify, {
        message: "Room not found",
      })
      return
    }

    socket.join(roomId)
    roomDataEmit(socket, room)

    // Logging
    const log = `[${username}:${socket.id}] joined room [${roomName}:${roomId}]`
    console.log(log)
    io.to(roomId).emit(SocketEvent.Log, log)
  }
}
