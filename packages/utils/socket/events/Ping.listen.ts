export const pingListen = (date: number) => {
  const latency = Date.now() - date
  console.log(`Ping: ${latency}ms`)
}
