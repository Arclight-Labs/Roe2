import { useContext } from "react"
import { bSave } from "./bsave.context"

export const useBSave = () => {
  return useContext(bSave)
}
