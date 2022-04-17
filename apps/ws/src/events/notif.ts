import { Server, Socket } from "socket.io"
import { NotifProps, Room, SocketEvent } from "interface"

interface JoinRoomProps {
  username: string
  password: string
}
export const roomEvents = (io: Server, socket: Socket) => {
  socket.on(SocketEvent.JoinRoom, async (props: JoinRoomProps) => {
    console.log(socket.handshake)
    // const promise = joinRoom(props)
    // const [room, error] = await runAsync(promise)
    // if (error || !room) {
    //   const message =
    //     error.response?.data?.message || "Unable to join the room."
    //   return socket.emit(SocketEvent.Error, { title: "Oops!", message })
    // }
    // socket.join(room.name)
    // io.to(room.name).emit(SocketEvent.Notify, {
    //   title: "New User",
    // } as NotifProps)
  })
}
