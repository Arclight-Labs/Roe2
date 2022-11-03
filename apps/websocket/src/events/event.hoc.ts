import { Server, Socket } from "socket.io"
export type EventFn<T extends CallableFunction> = (
  socket: Socket,
  io: Server
) => T

export const ev = <T extends CallableFunction>(
  socket: Socket,
  io: Server,
  callback: EventFn<T>
): T => {
  return callback(socket, io)
}
