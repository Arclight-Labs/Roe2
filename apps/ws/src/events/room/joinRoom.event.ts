import { SocketEvent } from "interface"
import { runAsync } from "utils/hooks"
import { EventFn } from "../event.hoc"
import { address } from "ip"

export const joinRoomListen: EventFn = (socket) => {
  return async ({ authorization, ...props }) => {
    // const config = { headers: { authorization: authorization } }
    // const promise = joinRoom(axInstance)(props, config)
    // const [room, error] = await runAsync(promise)
    // if (error || !room) {
    //   const axiosMessage = error?.response?.data?.message
    //   const message = axiosMessage || "Unable to join the room."
    //   return socket.emit(SocketEvent.Error, { title: "Oops!", message })
    // }
    // console.log(`${socket.id} joined room ${room.name}`)
    // socket.join(room.name)
    console.log("joinroomlisten")
  }
}
