import { SanitizedParticipantMap } from "interface/waypoint"
import { Payload } from "interface/ws"
import { globalDispatch, setParticipants, updateParticipant } from "../../redux"

export const participantsListen = (participants: SanitizedParticipantMap) => {
  globalDispatch(setParticipants(participants))
}

export const setParticipantListen = (payload: Payload.TeamUpdate) => {
  globalDispatch(updateParticipant(payload))
}
