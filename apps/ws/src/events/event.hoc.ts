import { Socket } from "socket.io"

export type EventFn = (socket: Socket) => (...args: any[]) => any | Promise<any>

export const ev = (socket: Socket, callback: EventFn): EventFn => {
  return callback(socket)
}
