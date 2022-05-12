import { FastifyPluginCallback } from "fastify"
import { Room } from "interface/db"
import { WebsocketRoom } from "interface/ws"
import { db } from "../../admin"
import { Col, Doc } from "../../types"
import { getRoomData } from "../utils/getRoomData.cfUtil"

interface Params {
  roomId: string
}
export const roomRoutes: FastifyPluginCallback = (sv, _, done) => {
  sv.get("/", async (req, res) => {
    const colRef = db.collection("rooms") as Col<Room>
    const snap = await colRef.get()
    const roomDocs = snap.docs ?? []

    const rooms: Record<string, WebsocketRoom> = {}
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
    let room = roomSnap.data()

    if (!room) {
      const roomColRef = db.collection("rooms")
      const roomQuery = roomColRef
        .where("uniqueCode", "==", roomId)
        .limit(1) as Col<Room>
      const roomColSnap = await roomQuery.get()
      const [doc] = roomColSnap.docs ?? []
      room = doc?.data()
    }

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
