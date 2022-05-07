import { SocketEvent } from "interface"
import { SetParticipants } from "interface/ws/SocketEmitter.interface"
import { socket } from "../Socket.instance"

export const setParticipants: SetParticipants = (participant) => {
  socket.emit(SocketEvent.Participants, participant)
}
