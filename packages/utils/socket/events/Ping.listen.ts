import { showNotification } from "@mantine/notifications"

export const pingListen = (date: number) => {
  const latency = Date.now() - date
  showNotification({
    title: "Pong!",
    message: `Latency: ${latency}ms`,
  })
}
