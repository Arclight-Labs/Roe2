import { SanitizedSeries } from "interface/waypoint"
import { getRoom, setRoom } from "./room.store.service"

type Series = SanitizedSeries
type SeriesMap = Record<string, Series>
type GetAllSeries = (roomId: string) => SeriesMap
type GetSeries = (roomId: string, seriesId: string) => Series | undefined
type SetAllSeries = (roomId: string, data: SeriesMap) => void
type SetSeriesFn = (state: Series) => Series
type SetSeriesPayload = SetSeriesFn | Series
type SetSeries = (
  roomId: string,
  seriesId: string,
  payload: SetSeriesPayload
) => void

export const getAllSeries: GetAllSeries = (roomId) => {
  const room = getRoom(roomId)
  return room?.matches ?? {}
}

export const getSeries: GetSeries = (roomId, seriesId) => {
  const room = getRoom(roomId)
  return (room?.matches ?? {})[seriesId]
}

export const setAllSeries: SetAllSeries = (roomId, series) => {
  setRoom(roomId, (s) => ({ ...s, series }))
}

export const setSeries: SetSeries = (roomId, seriesId, payload) => {
  const isFn = typeof payload === "function"

  if (isFn) {
    setRoom(roomId, (room) => ({
      ...room,
      matches: {
        ...room.matches,
        [seriesId]: {
          ...room.matches[seriesId],
          ...payload(room.matches[seriesId]),
        },
      },
    }))
    return
  }

  setRoom(roomId, (room) => ({
    ...room,
    matches: {
      ...room.matches,
      [seriesId]: payload,
    },
  }))
}
