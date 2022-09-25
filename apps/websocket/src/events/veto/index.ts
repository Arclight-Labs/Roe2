import { SocketEvent } from "interface"
import { Server, Socket } from "socket.io"
import { ev } from "../event.hoc"
import { vetoJoinEvent } from "./veto.join.event"
import { vetoMapPick } from "./veto.mapPick.event"
import { vetoSetSettings } from "./veto.setSettings.event"

const vetoEvents = (io: Server, socket: Socket) => {
  socket.on(SocketEvent.VetoMapPick, ev(socket, io, vetoMapPick))
  socket.on(SocketEvent.VetoSidePick, ev(socket, io, vetoMapPick))
  socket.on(SocketEvent.VetoSettings, ev(socket, io, vetoSetSettings))
  socket.on(SocketEvent.VetoJoin, ev(socket, io, vetoJoinEvent))
}

export default vetoEvents
