import { Room } from "interface"
import { BroadcastData, WebsocketRoom } from "interface/ws"
import { db } from "../../admin"
import { Doc } from "../../types"

export const getRoomData = async (room: Room): Promise<WebsocketRoom> => {
  const roomRef = db.collection("rooms").doc(room.id)
  const broadcastDataRef = roomRef
    .collection("public")
    .doc("broadcast") as Doc<BroadcastData>

  const broadcastDataSnap = await broadcastDataRef.get()
  const broadcastData = broadcastDataSnap.data() || {
    matches: {},
    participants: {},
    talents: {},
    tournament: null,
  }

  return { ...room, ...broadcastData }
}
