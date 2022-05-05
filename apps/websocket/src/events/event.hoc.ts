import { Server, Socket } from "socket.io"
export type InnerEventFunction = (...args: any[]) => any | Promise<any>
export type EventFn<T extends InnerEventFunction = InnerEventFunction> = (
  socket: Socket,
  io: Server
) => T

export const ev = <T extends InnerEventFunction>(
  socket: Socket,
  io: Server,
  callback: EventFn<T>
): EventFn<T> => {
  return callback(socket, io)
}
