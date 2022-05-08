import { NotifProps, SocketEvent } from "interface"
import { Socket } from "socket.io"

type EmitNotify = (socket: Socket, props: NotifProps) => void

export const emitNotify: EmitNotify = (socket, notifProps) => {
  socket.emit(SocketEvent.Notify, notifProps)
}
