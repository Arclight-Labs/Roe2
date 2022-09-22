import { Veto } from "interface/db"
import { defaultVeto } from "utils/general/defaultValues"
import { getSeries, setSeries } from "./series.store.service"

export const getVeto = (roomId: string, matchId: string): Veto | undefined => {
  return getSeries(roomId, matchId)?.veto
}
type SetVetoFn = (state: Veto) => Veto
type SetVetoPayload = SetVetoFn | Veto

type SetVeto = (
  roomId: string,
  seriesId: string,
  payload: SetVetoPayload
) => void

export const setVeto: SetVeto = (roomId, seriesId, veto) => {
  const isFn = typeof veto === "function"

  if (isFn) {
    setSeries(roomId, seriesId, (series) => ({
      ...series,
      veto: { ...series.veto, ...veto(series.veto ?? defaultVeto) },
    }))
    return
  }

  setSeries(roomId, seriesId, (series) => ({ ...series, veto }))
}
