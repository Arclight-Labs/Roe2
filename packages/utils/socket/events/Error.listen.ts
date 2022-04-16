import { NotificationProps, showNotification } from "@mantine/notifications"

export const errorListen = (props: NotificationProps) => {
  showNotification({ ...props, color: "#ff3333" })
}
