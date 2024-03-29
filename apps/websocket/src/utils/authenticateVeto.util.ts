import AES from "crypto-js/aes"
import Utf8 from "crypto-js/enc-utf8"
import "dotenv/config"
import { Socket } from "socket.io"
import { VetoPasswordType } from "utils/schema/veto.schema"
import { emitNotify } from "../emitters"
import { getSeries } from "../store"
import { getSocketRoom } from "./getSocketRoom.util"
import { getVetoSecret } from "./vetoSecret.util"

export const authenticateVeto =
  (socket: Socket) =>
  (accessToken: string, seriesId: string, type: VetoPasswordType): boolean => {
    const roomId = getSocketRoom(socket)
    if (!roomId) {
      emitNotify(socket, { message: "Unable to find room", color: "red" })
      return false
    }

    const series = getSeries(roomId, seriesId)

    if (!series) {
      emitNotify(socket, {
        message: "Unable to find series",
        title: "Error",
        color: "red",
      })
      return false
    }

    if (!series.veto) {
      emitNotify(socket, {
        message: "Veto is not enabled",
        title: "Error",
        color: "red",
      })
      return false
    }

    const secret = getVetoSecret()

    const hashedPassword = series.veto.passwords[type]
    if (!hashedPassword) {
      emitNotify(socket, {
        message: "Password is not setup correctly",
        title: "Error",
        color: "red",
      })
      return false
    }

    const password = AES.decrypt(hashedPassword, secret).toString(Utf8)
    if (accessToken !== password) {
      emitNotify(socket, {
        message: "Access Denied: Invalid Access Token",
        title: "Error",
        color: "red",
      })
      return false
    }

    return true
  }
