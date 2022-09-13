import { showNotification } from "@mantine/notifications"
import { Notif } from "interface/ws"

export const notifListen: ReturnType<Notif> = (props) => {
  showNotification(props)
}
