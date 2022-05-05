import { ev } from "../event.hoc"
import { SocketEvent } from "interface"
import { Server, Socket } from "socket.io"
import { joinRoomEvent } from "./joinRoom.event"
import { leaveRoomEvent } from "./leaveRoom.event"

const roomEvents = (io: Server, socket: Socket) => {
  socket.on(SocketEvent.JoinRoom, ev(socket, io, joinRoomEvent))
  socket.on(SocketEvent.LeaveRoom, ev(socket, io, leaveRoomEvent))
}

export default roomEvents
