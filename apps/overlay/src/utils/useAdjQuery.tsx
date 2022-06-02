import React from "react"
import { useLocation } from "react-router-dom"
import { QueryColor, QueryFont } from "./queryParams"

type PlayerStatCode = "id" | "name" | "value"
type AlignType = "left" | "center" | "right" | undefined
interface Adjustables {
  font: string
  fontColor: string
  fontSize: number
  align: AlignType
  record: PlayerStatCode
}

export function useAdjQuery(): Adjustables {
  const { search } = useLocation()

  const query = React.useMemo(() => new URLSearchParams(search), [search])
  const font = QueryFont[query.get("font") ?? "industry"]
  const fontColor = QueryColor[query.get("color") ?? "black"]
  const fontSize = +(query.get("size") ?? 100)
  const align = (query.get("align") as AlignType) ?? "left"
  const record = (query.get("record") as PlayerStatCode) ?? "name"

  return {
    font,
    fontColor,
    fontSize,
    align,
    record,
  }
}
