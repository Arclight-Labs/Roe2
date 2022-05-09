import { SocketEvent } from "interface"
import { Payload } from "interface/ws"
import {
  SetPariticipant,
  SetParticipants,
} from "interface/ws/SocketEmitter.interface"
import { socket } from "../Socket.instance"

export const setParticipants: SetParticipants = (participant) => {
  socket.emit(SocketEvent.Participants, participant)
}

export const setParticipant: SetPariticipant = (teamId, data) => {
  socket.emit(SocketEvent.SetParticipant, {
    teamId,
    data,
  } as Payload.TeamUpdate)
}
