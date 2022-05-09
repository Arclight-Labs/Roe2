import { JoinRoom, SocketEvent } from "interface"
import { roomDataEmit } from "../../emitters"
import { getRoom, setRoom } from "../../store"
import { loadRoom } from "../../store/services/loadRoom.service"
import { EventFn } from "../event.hoc"

export const joinRoomEvent: EventFn<JoinRoom> = (socket, io) => {
  return async ({ roomId, roomName, username }) => {
    let room = getRoom(roomId)
    if (!room) {
      const loadedRoom = await loadRoom(roomId)
      if (!loadedRoom) {
        socket.emit(SocketEvent.Notify, {
          message: "Room not found",
        })
        return
      }
      setRoom(loadedRoom.roomId, loadedRoom)
      room = loadedRoom
    }

    socket.join(roomId)
    roomDataEmit(socket, room)

    // Logging
    const log = `[${username}:${socket.id}] joined room [${roomName}:${roomId}]`
    console.log(log)
    io.to(roomId).emit(SocketEvent.Log, log)
  }
}
