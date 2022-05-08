import { SanitizedParticipant } from "interface/waypoint"
import { getRoom, setRoom } from "./room.store.service"

type Participant = SanitizedParticipant
type ParticipantMap = Record<string, Participant>
type GetAllParticipant = (roomId: string) => ParticipantMap
type GetParticipant = (
  roomId: string,
  participantId: string
) => Participant | undefined
type SetAllParticipant = (roomId: string, data: ParticipantMap) => void
type SetParticipantFn = (state: Participant) => Participant
type SetParticipantPayload = SetParticipantFn | Participant
type SetParticipant = (
  roomId: string,
  participantId: string,
  payload: SetParticipantPayload
) => void

export const getAllParticipant: GetAllParticipant = (roomId) => {
  const room = getRoom(roomId)
  return room?.participants ?? {}
}

export const getParticipant: GetParticipant = (roomId, participantId) => {
  const room = getRoom(roomId)
  return (room?.participants ?? {})[participantId]
}

export const setAllParticipant: SetAllParticipant = (roomId, participant) => {
  setRoom(roomId, (s) => ({ ...s, participant }))
}

export const setParticipant: SetParticipant = (
  roomId,
  participantId,
  payload
) => {
  const isFn = typeof payload === "function"

  if (isFn) {
    setRoom(roomId, (room) => ({
      ...room,
      participants: {
        ...room.participants,
        [participantId]: {
          ...room.participants[participantId],
          ...payload(room.participants[participantId]),
        },
      },
    }))
    return
  }

  setRoom(roomId, (room) => ({
    ...room,
    participants: {
      ...room.participants,
      [participantId]: payload,
    },
  }))
}
