import { NotificationProps } from "@mantine/notifications"
import { SocketEvent } from "interface"
import { socket } from "../Socket.instance"

export const errorEmit = (props: NotificationProps) => {
  socket.emit(SocketEvent.Error, props)
}
