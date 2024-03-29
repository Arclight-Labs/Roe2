import { SocketEvent } from "interface"
import { Server, Socket } from "socket.io"
import { ev } from "../event.hoc"
import { setLive } from "./setLive.event"

const liveEvents = (io: Server, socket: Socket) => {
  socket.on(SocketEvent.SetLive, ev(socket, io, setLive))
}

export default liveEvents
