import { FastifyPluginCallback } from "fastify"
import { Room } from "interface/db"
import { db } from "../../admin"
import { Col, Doc } from "../../types"
import { SanitizedWebsocketRoom } from "interface/ws"
import { getRoomData } from "../utils/getRoomData.cfUtil"

interface Params {
  roomId: string
}
export const roomRoutes: FastifyPluginCallback = (sv, _, done) => {
  sv.get("/", async (req, res) => {
    const colRef = db.collection("rooms") as Col<Room>
    const snap = await colRef.get()
    const roomDocs = snap.docs ?? []

    const rooms: Record<string, SanitizedWebsocketRoom> = {}
    for (const roomSnap of roomDocs) {
      const room = roomSnap.data()
      const data = await getRoomData(room)
      rooms[roomSnap.id] = data
    }

    res.status(200).send(rooms)
  })

  sv.get("/:roomId", async (req, res) => {
    const { roomId } = req.params as Params
    const roomRef = db.collection("rooms").doc(roomId) as Doc<Room>
    const roomSnap = await roomRef.get()
    const room = roomSnap.data()
    if (!room) {
      res.status(404).send({
        success: false,
        message: "Room not found",
      })
      return
    }
    const data = await getRoomData(room)
    res.status(200).send(data)
  })

  done()
}
