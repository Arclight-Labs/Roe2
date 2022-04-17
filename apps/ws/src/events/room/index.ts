import { ev } from "events/event.hoc"
import { SocketEvent } from "interface"
import { Socket } from "socket.io"
import { joinRoomListen } from "./joinRoom.event"

const roomEvents = (socket: Socket) => {
  socket.on(SocketEvent.JoinRoom, ev(socket, joinRoomListen))
}

export default roomEvents
