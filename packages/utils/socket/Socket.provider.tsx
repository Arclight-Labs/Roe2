import React, { PropsWithChildren } from "react"
import {
  errorEmit,
  joinRoom,
  leaveRoom,
  notif,
  ping,
  setLive,
  setMatch,
  setMatches,
  setParticipant,
  setParticipants,
  setRoom,
  setVetoSettings,
  tournament,
  vetoClaimCoin,
  vetoJoin,
} from "./events"
import { SocketContext, SocketContextDispatch } from "./Socket.context"
import { socket } from "./Socket.instance"

export const SocketProvider = ({ children }: PropsWithChildren) => {
  return (
    <SocketContextDispatch.Provider
      value={{
        tournament,
        ping,
        error: errorEmit,
        joinRoom,
        notif,
        leaveRoom,
        matches: setMatches,
        participants: setParticipants,
        setRoom,
        setMatch,
        setParticipant,
        setLive,
        vetoMapPick: () => {},
        vetoSettings: setVetoSettings,
        vetoSidePick: () => {},
        vetoJoin,
        vetoClaimCoin,
      }}
    >
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </SocketContextDispatch.Provider>
  )
}

export default SocketProvider
