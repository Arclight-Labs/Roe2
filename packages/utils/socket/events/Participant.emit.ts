import { SocketEvent } from "interface"
import { Payload } from "interface/ws"
import {
  SetPariticipant,
  SetParticipants,
} from "interface/ws/SocketEmitter.interface"
import { socket } from "../Socket.instance"

export const setParticipants: SetParticipants =
  (accessToken) => (participant) => {
    socket.emit(SocketEvent.Participants, participant, accessToken)
  }

export const setParticipant: SetPariticipant =
  (accessToken) => (teamId, data) => {
    socket.emit(
      SocketEvent.SetParticipant,
      { teamId, data } as Payload.TeamUpdate,
      accessToken
    )
  }
