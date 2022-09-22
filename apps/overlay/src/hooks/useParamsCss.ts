import { CSSProperties } from "@emotion/serialize"
import { useLocation } from "react-router-dom"
import { getQueryStringParams } from "../utils/getQueryStringParams"

export const useParamsCss = () => {
  const { search } = useLocation()
  return getQueryStringParams(search) as CSSProperties
}
