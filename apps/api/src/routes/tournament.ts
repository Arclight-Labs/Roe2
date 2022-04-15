import { FastifyPluginCallback } from "fastify"
export const tournamentRoutes: FastifyPluginCallback = (api, opts, done) => {
  api.get("/:_id", async (req, res) => {
    res.status(200).send(`halo`)
  })

  done()
}
