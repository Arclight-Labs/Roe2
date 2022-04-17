import { showNotification } from "@mantine/notifications"
import { Ping } from "interface"

export const pingListen: Ping = (date) => {
  const latency = Date.now() - date
  showNotification({
    title: "Pong!",
    message: `Latency: ${latency}ms`,
  })
}
