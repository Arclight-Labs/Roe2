import Fastify from "fastify"

const PORT = process.env.PORT || 1337
const LOC = "0.0.0.0"

const sv = Fastify({
  logger: true,
})

sv.get("/", async (req, res) => {
  res.send({ test: new Date() })
})

sv.listen(PORT, LOC, (err, address) => {
  if (err) {
    sv.log.error(err)
    process.exit(1)
  }
  sv.log.info(`server listening on ${address}`)
})
