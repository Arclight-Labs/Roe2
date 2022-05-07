import { SanitizedParticipantMap } from "interface/waypoint"
import { globalDispatch, setParticipants } from "../../redux"

export const participantsListen = (participants: SanitizedParticipantMap) => {
  globalDispatch(setParticipants(participants))
}
