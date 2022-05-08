import { SocketEvent } from "interface"
import { Server } from "socket.io"

type EmitRoomLog = (io: Server, roomId: string, log: string) => void
export const emitRoomLog: EmitRoomLog = (io, room, log) => {
  io.to(room).emit(SocketEvent.Log, log)
}
