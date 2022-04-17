import { showNotification } from "@mantine/notifications"
import { Notif } from "interface"

export const errorListen: Notif = (props) => {
  showNotification({ ...props, color: "#ff3333" })
}
