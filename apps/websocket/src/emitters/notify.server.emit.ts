import { NotifProps, SocketEvent } from "interface"
import { Server, Socket } from "socket.io"

type EmitNotify = (socket: Socket, props: NotifProps) => void

export const emitNotify: EmitNotify = (socket, notifProps) => {
  socket.emit(SocketEvent.Notify, notifProps)
}

type EmitRoomNotify = (io: Server, roomId: string, props: NotifProps) => void
export const emitRoomNotify: EmitRoomNotify = (io, roomId, notifProps) => {
  io.to(roomId).emit(SocketEvent.Notify, notifProps)
}
