import { SocketEvent } from "interface"
import { joinRoom } from "utils/api/queries"
import { runAsync } from "utils/hooks"
import { EventFn } from "../event.hoc"

export const joinRoomListen: EventFn = (socket) => {
  return async ({ authorization, ...props }) => {
    const config = { headers: { authorization: authorization } }
    const promise = joinRoom(props, config)
    const [room, error] = await runAsync(promise)
    if (error || !room) {
      const axiosMessage = error?.response?.data?.message
      const message = axiosMessage || "Unable to join the room."
      return socket.emit(SocketEvent.Error, { title: "Oops!", message })
    }
    console.log(`${socket.id} joined room ${room.name}`)
    socket.join(room.name)
  }
}
