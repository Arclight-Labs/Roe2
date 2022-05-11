import { Broadcast } from "interface/ws"
import { functions } from "../admin"

export const onCreate = functions.firestore
  .document("rooms/{roomId}")
  .onCreate(async (snap) => {
    const ref = snap.ref

    const liveRef = ref.collection("live").doc("broadcast")
    return liveRef.set({
      matches: {},
      participants: {},
      talents: {},
      tournament: null,
      roomId: snap.id,
      activeMatch: "",
      nextMatch: "",
      prevMatches: [],
      schedule: [],
    } as Broadcast)
  })
