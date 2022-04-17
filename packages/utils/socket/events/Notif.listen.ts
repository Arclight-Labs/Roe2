import { showNotification } from "@mantine/notifications"
import { Notif } from "interface/ws"

export const notifListen: Notif = (props) => {
  showNotification(props)
}
