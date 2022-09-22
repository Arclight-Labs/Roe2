import { CSSProperties } from "@emotion/serialize"
import { useLocation } from "react-router-dom"
import { getQueryStringParams } from "../utils/getQueryStringParams"

type ExcludedProperties = string[] | undefined
export const useParamsCss = (excludedProps: ExcludedProperties = []) => {
  const { search } = useLocation()
  return getQueryStringParams(search) as CSSProperties
}
