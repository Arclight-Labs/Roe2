import { Server, Socket } from "socket.io"
export type EventFn<T extends Function = (...args: any[]) => any> = (
  socket: Socket,
  io: Server
) => T

export const ev = <T extends Function>(
  socket: Socket,
  io: Server,
  callback: EventFn<T>
): T => {
  return callback(socket, io)
}
