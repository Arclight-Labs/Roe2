import { NotificationProps } from "@mantine/notifications"
import { SocketEvent } from "interface"
import { socket } from "../Socket.instance"

interface Props {
  roomName: string
  password: string
}
export const joinRoom = (props: Props) => {
  socket.emit(SocketEvent.JoinRoom, props)
}
