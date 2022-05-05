import { SocketEvent } from "interface"
import { LeaveRoom } from "interface/ws/SocketEmitter.interface"
import { EventFn } from "../event.hoc"

export const leaveRoomEvent: EventFn<LeaveRoom> = (socket, io) => {
  return async ({ roomId, roomName, username }) => {
    socket.leave(roomId)
    const log = `[${username}:${socket.id}] left room [${roomName}:${roomId}]`
    console.log(log)
    io.to(roomId).emit(SocketEvent.Log, log)
  }
}
