import {
  SanitizedParticipant,
  SanitizedParticipantMap,
} from "interface/waypoint"
import { ax } from "./axios.instance"

export const getParticipants = async (
  tournamentId: string
): Promise<SanitizedParticipantMap> => {
  const path = `/tournaments/${tournamentId}/participants`
  const res = await ax.get<SanitizedParticipantMap>(path)
  return res.data
}

export const getParticipant = async (tournamentId: string, teamId: string) => {
  const path = `/tournaments/${tournamentId}/participants/${teamId}`
  return ax.get<SanitizedParticipant>(path)
}
