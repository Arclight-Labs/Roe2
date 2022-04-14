import createServer from "./server"

const PORT = process.env.PORT || 1400
const HOSTNAME = "0.0.0.0"

const server = createServer()
server.listen(PORT, HOSTNAME, (err, address) => {
  if (err) throw err
  console.log(`API listening on ${address}`)
})
