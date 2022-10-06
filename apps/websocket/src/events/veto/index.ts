import { SocketEvent } from "interface"
import { Server, Socket } from "socket.io"
import { ev } from "../event.hoc"
import { vetoClaimCoin } from "./veto.claimCoin"
import { vetoMapPick } from "./veto.mapPick.event"
import { vetoReady } from "./veto.ready"
import { vetoReset } from "./veto.reset.event"
import { vetoSetSettings } from "./veto.setSettings.event"
import { vetoSidePick } from "./veto.sidePick.event"

const vetoEvents = (io: Server, socket: Socket) => {
  socket.on(SocketEvent.VetoMapPick, ev(socket, io, vetoMapPick))
  socket.on(SocketEvent.VetoSidePick, ev(socket, io, vetoSidePick))
  socket.on(SocketEvent.VetoSettings, ev(socket, io, vetoSetSettings))
  socket.on(SocketEvent.VetoReset, ev(socket, io, vetoReset))
  socket.on(SocketEvent.VetoClaimCoin, ev(socket, io, vetoClaimCoin))
  socket.on(SocketEvent.vetoReady, ev(socket, io, vetoReady))
}

export default vetoEvents
