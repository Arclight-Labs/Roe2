import { Room } from "interface"
import { Broadcast, WebsocketRoom } from "interface/ws"
import { getDB } from "../../firesbase-admin"
import { Doc } from "../../types"

export const getRoomData = async (room: Room): Promise<WebsocketRoom> => {
  const db = getDB()
  const roomRef = db.collection("rooms").doc(room.id)
  const broadcastDataRef = roomRef
    .collection("live")
    .doc("broadcast") as Doc<Broadcast>

  const broadcastDataSnap = await broadcastDataRef.get()
  const broadcastData = broadcastDataSnap.data() || {
    matches: {},
    participants: {},
    talents: {},
    tournament: null,
    roomId: room.id,
  }

  return { ...room, ...broadcastData }
}
